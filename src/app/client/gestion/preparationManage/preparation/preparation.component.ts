import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { RestSymptomService, Symptom } from 'src/app/client/Services/rest-symptom.service';
import { MatTableDataSource } from '@angular/material/table';
import { RestProductService, Product } from '../../../Services/rest-product.service';


import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { AddsymptomComponent } from 'src/app/admin/ModulePrescription/symptom/addsymptom/addsymptom.component';
import Swal from 'sweetalert2';
import { SelectionModel } from '@angular/cdk/collections';
import { HIGH_CONTRAST_MODE_ACTIVE_CSS_CLASS } from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector';
import { RestUserService, Nutrient } from '../../../Services/RestUser.service';

import { LoadingService } from 'src/app/loading.service';




@Component({
  selector: 'app-preparation',
  templateUrl: './preparation.component.html',
  styleUrls: ['./preparation.component.css']
})
export class PreparationComponent implements OnInit {
  displayedColumns = ['name'];
  dataSource = new MatTableDataSource<Product>();
  selection = new SelectionModel<Product>(false, []);
  displayedColumns1 = ['portion'];
  dataSource1 = new MatTableDataSource<Product>();
  displayedColumns2 = ['symptom_name'];
  displayedColumns4 = ['nutrients'];
  dataSource2 = new MatTableDataSource<Symptom>();
  displayedColumns5 = ['tenor'];
  dataSource4 = new MatTableDataSource<Product>();
  
  nutrient!: string;
  data: Array<any> = [];
  data1: Array<any> = [];
  displayedColumns3 = ['nutrient.name', 'tenor'];
  dataSource3 = new MatTableDataSource<Product>();
  list = [];
  portions: any = [];
  allsymptoms: any = [];
  symptoms:any = [];
  products: any;
  nutrients:any = [];
  visibility!: string;

  loading$ = this.loader.loading$;
  constructor(private _liveAnnouncer: LiveAnnouncer, private router: Router, private dialog: MatDialog, private RestProductService: RestProductService, private authService: RestUserService, private symptomservice: RestSymptomService,private loader: LoadingService) { }
  @ViewChild(MatSort) sort!: MatSort;
  async ngOnInit() {
    this.loader.show();
    (await this.RestProductService.getPreparations()).subscribe((x) => {
      if (x.length == 0) {
        alert("no product exist");
        this.router.navigate(['/home'])
      }
      else
      localStorage.setItem('product', JSON.stringify(x[0]));

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
      if (x.length == 0) {
        alert("no Symptom exist");
        this.router.navigate(['/home'])
      }
      else
      this.allsymptoms=x;
        localStorage.setItem("nbsymptoms", x.length.toString());
      this.dataSource2 = new MatTableDataSource(x);
      this.dataSource2.sort = this.sort;
      this.loader.hide();
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
    if((JSON.parse(localStorage.getItem('product')!)['creator_user']['id'])==(JSON.parse(localStorage.getItem('currentUser')!)['id']))
    {  
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
        Swal.fire('ce preparation a été supprimé', '', 'success')
      }
    })}
    
      else {
        Swal.fire({
          position: 'center',
          icon: 'info',
          title: 'vous n\'avez le droit de supprimer cette preparation',
          showConfirmButton: false,
          timer: 1500
        })
      
    }
  }

  
  ConfirmUptadeVisibility() {

    console.log("productttttt",(JSON.parse(localStorage.getItem('product')!)['creator_user']['id']))
    console.log((JSON.parse(localStorage.getItem('currentUser')!)['id']))

    if((JSON.parse(localStorage.getItem('product')!)['creator_user']['id'])==(JSON.parse(localStorage.getItem('currentUser')!)['id']))
   { Swal.fire({
      title: 'Etes-vous sur ?',
      icon: 'info',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Masquer/Demasquer',
      denyButtonText: `Annuler`,
    }).then((result) => {
      if (result.isConfirmed) {
        if((JSON.parse(localStorage.getItem('product')!)['visibility'])==true)
        { 
          this.UpdateVisisbilityProduct();
          Swal.fire('cette preparation a été masquée', '', 'success')
        }
        else{
          this.UpdateVisisbilityProduct1();
          Swal.fire('cette preparation a été démasquée', '', 'success')

        }
      }
    })
  }
  else {
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: 'vous n\'avez le droit de masquer cette preparation',
      showConfirmButton: false,
      timer: 1500
    })
  }
  }

  async preparationToManage(product: Product) {

    localStorage.setItem('product to manage', JSON.stringify(product.id));
    this.portions= [];
    this.data= [];
    this.nutrients=[];
    this.symptoms=[];
    localStorage.setItem('product', JSON.stringify(product));
    localStorage.setItem('symptom', JSON.stringify(this.symptoms));
    this.visibility=(JSON.parse(localStorage.getItem('product')!)['visibility']);
  }

  confirmBox(){
    Swal.fire({
      title: 'votre session a expirée',
      text:'veuillez reconnecter s\' il vous plait  !!',
      icon:'warning',
      showCancelButton: true,
      confirmButtonText: 'Ok!',
    }).then((result) => {
      this.authService.logout()

    })
  }


  async UpdateVisisbilityProduct1() {
    (await this.RestProductService.UpdateProductVisibility1())
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

  async UpdateVisisbilityProduct() {
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


  async deleteProduct() {
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
  search(id: string) {
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
              for (var i = 0; i < row.symptom.length; i++) {
                console.log("symptom",row.symptom[i].symptom_name);
                this.symptoms.push(row.symptom[i].symptom_name);
              }
    
  }
  checkedBox(symptom:any)
  {
    var x=false;
    console.log(this.symptoms);
    for (var i = 0; i < this.symptoms.length; i++) {
     
     console.log( "symptommmmm",this.symptoms);
      if(this.symptoms[i]== symptom)
      {
      
         x= true;
      }
     
    }
    return x;
  }
  update(){
    if((JSON.parse(localStorage.getItem('product')!)['creator_user']['id'])==(JSON.parse(localStorage.getItem('currentUser')!)['id']))
    {
      this.router.navigate(['/gestion/preparation/edit']);
    }
    else {
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'vous n\'avez le droit de modifier cette preparation',
        showConfirmButton: false,
        timer: 1500
      })
    }
    
  }
}
