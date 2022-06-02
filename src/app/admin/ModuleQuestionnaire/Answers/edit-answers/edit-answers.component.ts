import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RestProductService } from 'src/app/client/Services/rest-product.service';
import { RestQuestionnaireService } from 'src/app/client/Services/rest-questionnaire.service';
import { RestResponseService } from 'src/app/client/Services/rest-response.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-answers',
  templateUrl: './edit-answers.component.html',
  styleUrls: ['./edit-answers.component.css']
})
export class EditAnswersComponent implements OnInit {

  Nom!: string;
  Prenom!: string;
  UpdateQuest !: FormGroup;
  isChecked!: boolean;
  Questionnaires: Array<any> = [];
  productsGetted: Array<any> = [];
  C_dropdownListPreparation: Array<any> = [];
  C_dropdownListSuppliments: Array<any> = [];
  I_dropdownListPreparation: Array<any> = [];
  I_dropdownListSuppliments: Array<any> = [];

  I_ListPreparation: Array<any> = [];
  I_ListSuppliments: Array<any> = [];
  SelectedProducts: Array<any> = [];
  C_ListPreparation: Array<any> = [];
  C_ListSuppliments: Array<any> = [];

  itemsPI:Array<any>=[];
  itemsPC:Array<any>=[];
  itemsCI:Array<any>=[];
  itemsCC:Array<any>=[]

  constructor(private RestResponseService: RestResponseService, private RestQuestionnaireService: RestQuestionnaireService, private _formBuilder: FormBuilder, private router: Router, private http: HttpClient, private sanitizer: DomSanitizer, private datePipe: DatePipe, private RestProductService: RestProductService) {

    this.UpdateQuest = this._formBuilder.group({
      title: ['', [Validators.required]],
      order: ['', [Validators.required]],
      ispublished: [''],
      Questionnaire: [''],
      Products: [this.I_ListPreparation, this.I_ListSuppliments, this.C_ListPreparation, this.C_ListSuppliments],
      C_preparation :[''],
      I_preparation :[''],
      C_suppliment :[''],
      I_suppliment :[''],


    });

  }

  async ngOnInit() {

    (await this.RestQuestionnaireService.getQuestionnaires()).subscribe((x) => {
      for (var i = 0; i < x.length; i++)
        this.Questionnaires.push(x[i]['title'])
    }),

      (await this.RestProductService.getProducts()).subscribe((x) => {
        let tmp = [];
        let tmp2 = [];


        for (var i = 0; i < x.length; i++) {
          if (x[i].type == 'preparation') {

            tmp.push(x[i].name);
            // this.I_dropdownListPreparation
            this.I_dropdownListPreparation = tmp;
            this.C_dropdownListPreparation = tmp;
          }
          else {

            tmp2.push(x[i].name);
            this.I_dropdownListSuppliments = tmp2;
            this.C_dropdownListSuppliments = tmp2;
          }
        }

      });
    (await this.RestResponseService.getAnswer(localStorage.getItem('answer to manage'))).subscribe(
      response => {

       console.log(response)
      //  console.log(response[0]['questionnaire']['title'])
        
        this.productsGetted = response[0]['answersProducts']
        console.log(this.productsGetted)
        this.UpdateQuest = this._formBuilder.group({

          
        })
        for (var i=0; i<this.productsGetted.length;i++)

        {
           if ((this.productsGetted[i]['product']['type'] == "preparation") && (this.productsGetted[i]['indication'] == true)) {
            this.itemsPI.push(this.productsGetted[i]['product']['name']);
              localStorage.setItem('I_preparation',JSON.stringify(this.itemsPI))
           }
          else  if ((this.productsGetted[i]['product']['type'] == "complement") && (this.productsGetted[i]['indication'] == true)) {
            this.itemsCI.push(this.productsGetted[i]['product']['name']);
           localStorage.setItem('I_suppliment',JSON.stringify(this.itemsCI))
 
           }
          else if ((this.productsGetted[i]['product']['type'] == "complement") && (this.productsGetted[i]['indication'] == false)) {
            this.itemsCC.push(this.productsGetted[i]['product']['name']);

           localStorage.setItem('C_suppliment',JSON.stringify(this.itemsCC))
 
           }
           else  if ((this.productsGetted[i]['product']['type'] == "preparation") && (this.productsGetted[i]['indication'] == false)) {
            this.itemsPC.push(this.productsGetted[i]['product']['name']);

             localStorage.setItem('C_preparation',JSON.stringify(this.itemsPC))
         
 
           }}
           this.UpdateQuest = this._formBuilder.group({
            title: [JSON.parse(localStorage.getItem('answertoupdate')!)['name']],
            order: [JSON.parse(localStorage.getItem('answertoupdate')!)['ordering']],
            ispublished: [JSON.parse(localStorage.getItem('answertoupdate')!)['isPublished']],
            Questionnaire: [response[0]['questionnaire']['title']],
            C_preparation: [JSON.parse(localStorage.getItem('C_preparation')!)],
        I_preparation: [JSON.parse(localStorage.getItem('I_preparation')!)],
        C_suppliment: [JSON.parse(localStorage.getItem('C_suppliment')!)],
        I_suppliment: [JSON.parse(localStorage.getItem('I_suppliment')!)],
          });
     },
        
        
    )}

  async updateQuestionnaire() {
    if (this.UpdateQuest.controls.I_preparation.value !== null)
    this.UpdateQuest.controls.I_preparation.value.forEach((element: any) => this.SelectedProducts.push({ 'name': element, 'indication': true }));
    if (this.UpdateQuest.controls.I_suppliment.value !== null)
    this.UpdateQuest.controls.I_suppliment.value.forEach((element: any) => this.SelectedProducts.push({ 'name': element, 'indication': true }));
    if (this.UpdateQuest.controls.C_preparation.value !== null)
    this.UpdateQuest.controls. C_preparation.value.forEach((element: any) => this.SelectedProducts.push({ 'name': element, 'indication': false }));
    if (this.UpdateQuest.controls.C_suppliment.value !== null)
    this.UpdateQuest.controls.C_suppliment.value.forEach((element: any) => this.SelectedProducts.push({ 'name': element, 'indication': false }));
    console.log(this.SelectedProducts)
   


  let  info= this._formBuilder.group({
      Products:Array(this.SelectedProducts),
      title:this.UpdateQuest.controls.title.value,
      Questionnaire:this.UpdateQuest.controls.Questionnaire.value,
      order:this.UpdateQuest.controls.order.value,
     ispublished:this.UpdateQuest.controls.ispublished.value
      

    })
  ;
   
  //  console.log(data),
      (await this.RestResponseService.updateAnwser(info.value))
        .subscribe(
          (response: any) => {
            console.log(response),
              // localStorage.setItem('answertoupdate',JSON.stringify(response))
              this.successNotification(),
              localStorage.removeItem('C_preparation'),
              localStorage.removeItem('I_preparation')
              localStorage.removeItem('C_suppliment')
              localStorage.removeItem('I_suppliment')

              this.router.navigate(['/admin/answers/Listeanswers'])
          },


        )
  }

  successNotification() {
    Swal.fire('votre informations ont été changés avec succés !!', 'success');
  }
  checkValue(event: any) {
  }
  changeQuestionnaire(e: any) {
    this.Activity?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  get Activity() {
    return this.UpdateQuest.get('quest');
  }
}

