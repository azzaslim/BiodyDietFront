import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AddsymptomComponent } from 'src/app/admin/ModulePrescription/symptom/addsymptom/addsymptom.component';
import Swal from 'sweetalert2';
import { Product, RestProductService } from '../../../Services/rest-product.service';
import { RestSymptomService, Symptom } from 'src/app/client/Services/rest-symptom.service';
import { RestUserService } from '../../../Services/RestUser.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {

  displayedColumns = ['name'];
  dataSource = new MatTableDataSource<Product>();
  selection = new SelectionModel<Product>(false, []);
  displayedColumns1 = ['portion'];
  dataSource1 = new MatTableDataSource<Product>();
  displayedColumns2 = ['symptom_name'];
  dataSource2=new MatTableDataSource<Symptom>();
  symptoms!:string;
   list=[];
   portions: any = [];
   products: any;
   nutrients:any = [];

  constructor(private _liveAnnouncer: LiveAnnouncer, private router: Router,private dialog: MatDialog, private RestProductService: RestProductService, private authService: RestUserService,private symptomservice:RestSymptomService) { }
  @ViewChild(MatSort) sort!: MatSort;
     async ngOnInit() {
      
      (await this.RestProductService.getProducts()).subscribe((x) => {
        if (x.length==0)
        {
          alert("no product exist");
          this.router.navigate(['/home'])
        }
        else
      localStorage.setItem("nbproducts",x.length.toString())
      this.products = x;
      this.getOneProduct(this.products[0]);
      this.dataSource = new MatTableDataSource(x);
      this.dataSource.sort = this.sort;
    },
      err => {
        this.authService.logout(),
          console.log(err),
          this.failNotification();

      }
      );
      (await this.symptomservice.getSymptoms()).subscribe((x) => {
        if (x.length==0)
        {
          alert("no Symptom exist");
          this.router.navigate(['/home'])
        }
        else
      localStorage.setItem("nbsymptoms",x.length.toString());
      this.dataSource2= new MatTableDataSource(x);
      this.dataSource2.sort = this.sort;
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
this.deleteProduct()
Swal.fire('ce symptom a été supprimé', '', 'success')
} 
})
  }
 
  async preparationToManage(product: Product) {
    // console.log('symptom to manage', JSON.stringify(symptom.id));
    this.portions= [];
    this.nutrients=[];
     localStorage.setItem('product to manage', JSON.stringify(product.id));
     localStorage.setItem('product', JSON.stringify(product));
   }
   async UpdateVisisbilityProduct(){
    //console.log(typeof(JSON.parse(localStorage.getItem('symptom to manage')!))),
    (await this.RestProductService.UpdateProductVisibility())
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
  
  ConfirmUptadeVisibility() {

    Swal.fire({
      title: 'Etes-vous sur ?',
      icon: 'info',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Masquer',
      denyButtonText: `Annuler`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.UpdateVisisbilityProduct();
        Swal.fire('ce produit a été masqué', '', 'success')
      }
    })
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
    (await this.RestProductService.deleteProduct(JSON.parse(localStorage.getItem('product to manage')!)))
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
     getOneProduct(row: any) {
      console.log("pppppppppppppppppppppppppppppppppp", row)
      this.portions.push(row.portion)
  
      console.log("======>",row.product_nutrients )
  
       console.log("potionnnnn", this.portions)
       //console.log("nutrient",row.product_nutrients[0].nutrient);
       for (var i = 0; i < row.product_nutrients.length; i++) {
                 console.log("nutrient",row.product_nutrients[i].nutrient);
                 this.nutrients.push(row.product_nutrients[i].nutrient);
                }
                console.log("tettett",this.nutrients)
      
    }
}
