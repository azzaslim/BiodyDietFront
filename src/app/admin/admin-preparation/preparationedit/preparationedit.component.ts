import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RestProductService } from 'src/app/client/Services/rest-product.service';
import Swal from 'sweetalert2';
import { Symptom } from '../../../client/Services/rest-symptom.service';
import { RestSymptomService } from 'src/app/client/Services/rest-symptom.service';
import { RestNutrientService } from 'src/app/client/Services/rest-nutrient.service';

@Component({
  selector: 'app-preparationedit',
  templateUrl: './preparationedit.component.html',
  styleUrls: ['./preparationedit.component.css']
})
export class PreparationeditComponent implements OnInit {
  name!:string;
  portion!:string;
  composition!:string;
  comment!:string;
  Nutrientl: Array<any> = [];
  Symotoml: Array<any> = [];
  NutrientsGetted: Array<any> = [];
  SymptomsGetted: Array<any> = [];
  dropdownListSymptom: Array<any> = [];
  dropdownListNutrient:Array<any> = [];
  SelectedSymptoms: Array<any> = [];
  SelectedNutrients: Array<any> = [];
  ListSymptom: Array<any> = [];
  items:Array<any>=[];
  CurrentProduct !: FormGroup;

  constructor(private restProductservice: RestProductService, private RestNutrientService:RestNutrientService,private _formBuilder: FormBuilder,private router: Router,private http: HttpClient,private sanitizer: DomSanitizer, private datePipe: DatePipe , private symptomservice:RestSymptomService) { 
  
    this.CurrentProduct = this._formBuilder.group({
      name: [''],
      portion: [''],
      comment: [''], 
      composition: [''], 
      Symptoms:[this.Symotoml],
      Nutrients:[this.Nutrientl],
      symptomsList: [''],
      NutrientsList:[''],
    });

}
  async ngOnInit(): Promise<void> {
    (await this.restProductservice.getOneProduct(JSON.parse(localStorage.getItem('product to manage')!))).subscribe(
      response => {
       
        //console.log(response)    
            localStorage.setItem("producttoupdate",JSON.stringify(response))
            this.CurrentProduct = this._formBuilder.group({
              name: [JSON.parse(localStorage.getItem('producttoupdate')!)[0]['name']],
              portion: [JSON.parse(localStorage.getItem('producttoupdate')!)[0]['portion']],
              comment: [JSON.parse(localStorage.getItem('producttoupdate')!)[0]['comment']], 
              composition: [JSON.parse(localStorage.getItem('producttoupdate')!)[0]['composition']], 
              symptomsList: [JSON.parse(localStorage.getItem('symptomsList')!)],
             NutrientsList: [JSON.parse(localStorage.getItem('nutrientsList')!)],
            });
          }),
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
      }),
      (await (this.restProductservice.getOneProduct(JSON.parse(localStorage.getItem('product to manage')!)))).subscribe(
        response => {
        
          localStorage.removeItem('symptomsList');
          localStorage.removeItem('nutrientsList');
        let test1=(response[0]['product_nutrients']);
        let test=(response[0]['symptom']);
        for (var i=0;i<test.length;i++)
        {
          this.SymptomsGetted.push(test[i]['symptom_name'])
          localStorage.setItem('symptomsList',JSON.stringify(this.SymptomsGetted))
        }

        for (var i=0;i<test1.length;i++)
        {
          this.NutrientsGetted.push(test1[i]['nutrient']['name'])
          localStorage.setItem('nutrientsList',JSON.stringify(this.NutrientsGetted))
        }
      }),

      this.CurrentProduct= this._formBuilder.group({
        name: [localStorage.getItem('name')!, [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
        portion: [localStorage.getItem('portion')!, [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
        comment: [localStorage.getItem('comment')!, [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
        composition: [localStorage.getItem('composition')!, [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
        symptomsList: [JSON.parse(localStorage.getItem('symptomsList')!)],
        NutrientsList: [JSON.parse(localStorage.getItem('nutrientsList')!)],
      });
        }
  async updateProduct(){
    

   
    this.CurrentProduct.controls.symptomsList.value.forEach((element: any) => this.SelectedSymptoms.push({ 'symptom_name': element}));
    this.CurrentProduct.controls.NutrientsList.value.forEach((element: any) => this.SelectedNutrients.push({ 'name': element}));
    console.log(this.SelectedSymptoms)

    let  info= this._formBuilder.group({
      
      name:this.CurrentProduct.controls.name.value,
      portion:this.CurrentProduct.controls.portion.value,
      comment:this.CurrentProduct.controls.comment.value,
      composition:this.CurrentProduct.controls.composition.value,
     
      Symptoms:Array(this.SelectedSymptoms),
      Nutrients:Array(this.SelectedNutrients)
     
    })
  ;  

  console.log(info);
    let data = this.CurrentProduct.value;
    //console.log(data),
    (await this.restProductservice.updateProduct(info.value))
      .subscribe(
        (      response: any) => {
          console.log(response),
          this.successNotification(),
          this.router.navigate(['/admin/preparation/listpreparation'])
  },
  
  
      )
  }


  get Activity() {
    return this.CurrentProduct.get('option');
  }
  successNotification() {
    Swal.fire( 'votre informations ont été changés avec succés !!', 'success');
  }
}
