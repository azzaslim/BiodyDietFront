import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, Symptom } from 'src/app/client/Services/RestUser.service';
import { Product } from 'src/app/client/Services/RestUser.service';
import {MatTableDataSource} from '@angular/material/table';
import { RestProductService } from '../../Services/rest-product.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { AddsymptomComponent } from 'src/app/admin/symptom/addsymptom/addsymptom.component';
import Swal from 'sweetalert2';
import {SelectionModel} from '@angular/cdk/collections';


@Component({
  selector: 'app-preparation',
  templateUrl: './preparation.component.html',
  styleUrls: ['./preparation.component.css']
})
export class PreparationComponent implements OnInit {
  displayedColumns = ['name'];
  dataSource = new MatTableDataSource<Product>();
  selection = new SelectionModel<Product>(false, []);
 
  //dataSource1 = new MatTableDataSource<Nutrient>();

  constructor(private _liveAnnouncer: LiveAnnouncer, private router: Router,private dialog: MatDialog, private user: RestProductService, private authService: AuthService) { }
  @ViewChild(MatSort) sort!: MatSort;
     async ngOnInit() {
      (await this.user.getProducts()).subscribe((x) => {
        if (x.length==0)
        {
          alert("no product exist");
          this.router.navigate(['/home'])
        }
        else
      localStorage.setItem("nbproducts",x.length.toString())
      this.dataSource = new MatTableDataSource(x);
      this.dataSource.sort = this.sort;
    },
      err => {
        this.authService.logout(),
          console.log(err),
          this.failNotification();

      }
      )
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
 
  async symptomToManage(product: Product) {
    console.log('product to manage', JSON.stringify(product.id));
    localStorage.setItem('product to manage', JSON.stringify(product.id));
    console.log('product to manage', JSON.stringify(product.id));
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
       this.router.navigate(['/admin/product/productlist'])
       this.ngOnInit()
      },
      err => {
        console.log(err)
      })
   
  }
  search(id :string){
    console.log(id);
     }
   
  
}
