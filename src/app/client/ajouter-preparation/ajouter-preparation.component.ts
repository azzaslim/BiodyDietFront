import { LiveAnnouncer } from "@angular/cdk/a11y";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { Product, RestProductService } from "../Services/rest-product.service";
import { Symptom, RestSymptomService } from "../Services/rest-symptom.service";
import { RestUserService } from "../Services/RestUser.service";

@Component({
  selector: 'app-ajouter-preparation',
  templateUrl: './ajouter-preparation.component.html',
  styleUrls: ['./ajouter-preparation.component.css']
})
export class AjouterPreparationComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns = ['composition'];
  dataSource = new MatTableDataSource<Product>();
  displayedColumns2 = ['symptom_name'];
  dataSource2=new MatTableDataSource<Symptom>();
  addData : FormGroup =new FormGroup({});
  ListSymptom: Array<any> = [];
  listnutrient: Array<any> = [];
  SelectedSymptoms: Array<any> = [];
  SelectedNutrients:Array<any> = [];
  dropdownListSymptom: Array<any> = [];
  constructor(private _liveAnnouncer: LiveAnnouncer,private RestProductService : RestProductService ,private router:Router, private formBuilder : FormBuilder,private user: RestUserService,private symptomservice:RestSymptomService,private authService: RestUserService ) { 

    this.addData=formBuilder.group({
      name:['',[Validators.required]],
      portion:['',[Validators.required]],
      comment:['',[Validators.required]],
      composition:['',[Validators.required]],
      symptoms: [this.ListSymptom],
      Nutrients:[this.listnutrient],
    })
  }
  announceSortChange(sortState: Sort) {

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }

  }
  failNotification() {
    Swal.fire('votre session a expiré', 'veuillez reconnecter s\' il vous plait  !!', 'error');
  }
  get f() {
    return this.addData.controls;
  }
  async add(){
  
  this.ListSymptom.forEach(element =>this.SelectedSymptoms.push({'symptom_name': element}) );
  this.listnutrient.forEach(element =>this.SelectedNutrients.push({'name': element}) );
  this.addData.controls.symptoms.patchValue(this.SelectedSymptoms);
        this.addData.controls.Nutrients.patchValue(this.SelectedNutrients);
  let data = this.addData.value;
  (await this.RestProductService.addProduct(data))
  .subscribe(
    response=> {
      this.successNotification();
      this.router.navigate(['/preparations'])
    },
    err => {console.log(err),
      this.failNotification();
    }
   
  )
  
    }

    async ngOnInit(): Promise<void> {
      this.RestProductService.getProducts().subscribe((x) =>{
        this.dataSource =new MatTableDataSource(x);
        //console.log(x);
    });
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
    (await this.symptomservice.getSymptoms()).subscribe((x) => {
      let list2= [];
      for (var i = 0; i < x.length; i++) {
          list2.push(x[i]['symptom_name']);
          this.dropdownListSymptom = list2;
        }
    })
   
}

successNotification() {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Supplement ajouté avec succées',
    showConfirmButton: false,
    timer: 1500
  })
}
}
