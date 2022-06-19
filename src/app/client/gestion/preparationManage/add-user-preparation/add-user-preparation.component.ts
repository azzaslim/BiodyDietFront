import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RestProductService } from 'src/app/client/Services/rest-product.service';
import { RestNutrientService } from 'src/app/client/Services/rest-nutrient.service';
import Swal from 'sweetalert2';
import { RestSymptomService } from 'src/app/client/Services/rest-symptom.service';


@Component({
  selector: 'app-add-user-preparation',
  templateUrl: './add-user-preparation.component.html',
  styleUrls: ['./add-user-preparation.component.css']
})
export class AddUserPreparationComponent implements OnInit {

  name!:string;
  portion!:string;
  composition!:string;
  comment!:string;
  NutrientsGetted: Array<any> = [];
  SymptomsGetted: Array<any> = [];
  dropdownListSymptom: Array<any> = [];
  dropdownListNutrient:Array<any> = [];
  SelectedSymptoms: Array<any> = [];
  SelectedNutrients:Array<any> = [];
  ListSymptom: Array<any> = [];
  listnutrient: Array<any> = [];
  items:Array<any>=[];
  AddProduct !: FormGroup;
  AddNewProduct !: FormGroup;
  constructor(private restProductservice: RestProductService, private RestNutrientService:RestNutrientService,private _formBuilder: FormBuilder,private router: Router,private http: HttpClient,private sanitizer: DomSanitizer, private datePipe: DatePipe , private symptomservice:RestSymptomService, private RestProductService:RestProductService) { 
  
    this.AddNewProduct = this._formBuilder.group({
      name: ['',[Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
      portion: ['',[Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
      comment: ['',[Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]], 
      composition: ['',[Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]], 
      quantite: ['',[Validators.required, Validators.pattern('^(((0[1-9]|[12][0-9]|30)[-/]?(0[13-9]|1[012])|31[-/]?(0[13578]|1[02])|(0[1-9]|1[0-9]|2[0-8])[-/]?02)[-/](?:19|20)[0-9]{2}|29[-/]?02[-/](?:19|20)[0-9]{2})$')]], 
      symptoms: [this.ListSymptom],
      Nutrients:[this.listnutrient],
      /* symptomsList:[this.ListSymptom],
      NutrientsList:[this.listnutrient] */
    });

}
  async ngOnInit(): Promise<void> {
  
      (await this.symptomservice.getSymptoms()).subscribe((x) => {
        let list2= [];
        for (var i = 0; i < x.length; i++) {
            list2.push(x[i]['symptom_name']);
            this.dropdownListSymptom = list2;
          }
      }),
      (await this.RestNutrientService.getNutrients()).subscribe((x) => {
        let list2= [];
        for (var i = 0; i < x.length; i++) {
            list2.push(x[i]['name']);
            this.dropdownListNutrient = list2;
          }
      })}
      get f() {
        return this.AddNewProduct.controls;
      }
    
      async Add_Product() {
    this.ListSymptom.forEach(element =>this.SelectedSymptoms.push({'symptom_name': element}) );
    this.listnutrient.forEach(element =>this.SelectedNutrients.push({'name': element}) );
    
   
   // console.log(this.SelectedSymptoms)
    this.AddNewProduct.controls.symptoms.patchValue(this.SelectedSymptoms);
        this.AddNewProduct.controls.Nutrients.patchValue(this.SelectedNutrients);
        let data = this.AddNewProduct.value;
        console.log(data);
        (await this.RestProductService.addPreparation(data)).subscribe(
          response => {
           
            this.successNotification();
            this.router.navigate(['/preparations'])
          },
          err => {
            console.log(err),
              this.failNotification()
          }
        )
      }

      failNotification() {
        Swal.fire( 'veuillez verifier vos informations', 'error')
      }
    
      successNotification() {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Preparation ajoutée avec succées',
          showConfirmButton: false,
          timer: 1500
        })
      }
}
