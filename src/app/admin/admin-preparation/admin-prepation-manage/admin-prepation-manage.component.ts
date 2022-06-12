import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AddsymptomComponent } from 'src/app/admin/ModulePrescription/symptom/addsymptom/addsymptom.component';
import Swal from 'sweetalert2';
import { RestUserService } from 'src/app/client/Services/RestUser.service';
import { RestSymptomService, Symptom } from 'src/app/client/Services/rest-symptom.service';
import { RestProductService , Product} from 'src/app/client/Services/rest-product.service';
import { LoadingService } from 'src/app/loading.service';

@Component({
  selector: 'app-admin-prepation-manage',
  templateUrl: './admin-prepation-manage.component.html',
  styleUrls: ['./admin-prepation-manage.component.css']
})
export class AdminPrepationManageComponent implements OnInit {
  displayedColumns = ['id','name','portion','composition','action'];
  dataSource = new MatTableDataSource<Product>();
  selection = new SelectionModel<Product>(false, []);
  /* displayedColumns1 = ['portion'];
  dataSource1 = new MatTableDataSource<Product>();
  displayedColumns2 = ['symptom_name'];
  dataSource2=new MatTableDataSource<Symptom>(); */
  symptoms!:string;
   list=[];
   loading$ = this.loader.loading$;

  constructor(private _liveAnnouncer: LiveAnnouncer, private router: Router,private dialog: MatDialog, private user: RestProductService, private authService: RestUserService,private symptomservice:RestSymptomService,private loader: LoadingService) { }
  @ViewChild(MatSort) sort!: MatSort;
     async ngOnInit() {
      this.loader.show();
      this.getOneProduct();
      (await this.user.getAdminPreparations()).subscribe((x) => {
        if (x.length==0)
        {
          alert("no product exist");
          this.router.navigate(['/home'])
        }
        else
      localStorage.setItem("nbproducts",x.length.toString())
      this.dataSource = new MatTableDataSource(x);
      this.dataSource.sort = this.sort;
      this.loader.hide()

    },
      err => {
        this.authService.logout(),
          console.log(err),
          this.failNotification();

      }
      );
     
      };

  announceSortChange(sortState: Sort) {

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  failNotification() {
    Swal.fire('votre session a expiré', 'veuillez reconnecter s\' il vous plait  !!', 'error');
  }
  ConfirmationNotification() {
    
    Swal.fire({
      title: 'Etes-vous sur ?',
      icon: 'info',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Supprimer',
      denyButtonText: `Annuler`,
    }).then((result) => {
      if (result.isConfirmed) {
    this.deleteProduct();
    Swal.fire('ce symptom a été supprimé', '', 'success');
    } 
    })
      }
 
  async preparationToManage(product: Product) {
     localStorage.setItem('product to manage', JSON.stringify(product.id));
     localStorage.setItem('producttoupdate', JSON.stringify(product));
   }
  
  confirmBox(){
    Swal.fire({
      title: 'votre session a expirée',
      text: 'veuillez reconnecter s\' il vous plait  !!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ok!',
    }).then((result) => {
     
        this.authService.logout()
      
    })
  }
  async openDialog(): Promise<void> {
    
    const dialogRef = this.dialog.open(AddsymptomComponent, {
      width: '50%',
      height: '55%',
      data: {},
    });
 
    
  
  }
  async deleteProduct(){
    //console.log(typeof(JSON.parse(localStorage.getItem('symptom to manage')!))),
    (await this.user.deleteProduct(JSON.parse(localStorage.getItem('product to manage')!)))
    .subscribe(
      async response => {
       console.log(response)
       this.router.navigate(['/preparation'])
       this.ngOnInit()
      },
      err => {
        console.log(err)
      })
   
  }
  search(id :string){
    console.log(id);
     }
     async getOneProduct(){
     ( (await (this.user.getOneProduct(JSON.parse(localStorage.getItem('product to manage')!)))).subscribe((x) => {
      this.dataSource = new MatTableDataSource(x);
      this.dataSource.sort = this.sort;
  
    },
      err => {
        this.authService.logout(),
          console.log(err),
          this.failNotification();

      }
      
      )
      )
      //this.symptoms =JSON.parse(localStorage.getItem('product')!);
     /* this.list.forEach(element => {
        console.log(element);
      }); */
      this.symptoms =JSON.parse(localStorage.getItem('product')!)['symptom']['symptom_name'];
    //console.log(this.symptoms);

    }
    async UpdateProductVisibility(){
      (await this.user.UpdateProductVisibility())
      .subscribe(
        async response => {
         console.log(response)
         this.router.navigate(['/preparation'])
         this.ngOnInit()
        },
        err => {
          console.log(err)
        })
     
    }
  

}
