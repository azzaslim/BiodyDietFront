import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RestQuestionnaireService } from 'src/app/client/Services/rest-questionnaire.service';
import { RestResponseService } from 'src/app/client/Services/rest-response.service';
import { RestUserService } from 'src/app/client/Services/RestUser.service';
import Swal from 'sweetalert2';
import { RestProductService } from 'src/app/client/Services/rest-product.service';
import { findLast } from '@angular/compiler/src/directive_resolver';


@Component({
  selector: 'app-add-answers',
  templateUrl: './add-answers.component.html',
  styleUrls: ['./add-answers.component.css']
})
export class AddAnswersComponent implements OnInit {




  AddAnswerForm!: FormGroup;
  isChecked!: boolean;
  I_ListPreparation: Array<any> = [];
  I_ListSuppliments: Array<any> = [];
  SelectedProducts: Array<any> = [];
  C_ListPreparation: Array<any> = [];
  C_ListSuppliments: Array<any> = [];

  Questionnaires: Array<any> = [];
  C_dropdownListPreparation: Array<any> = [];
  C_dropdownListSuppliments: Array<any> = [];

  I_dropdownListPreparation: Array<any> = [];
  I_dropdownListSuppliments: Array<any> = [];
  indic!: number;
  C_indic!: number;
  //dropdownSettings!: IDropdownSettings;
  dropDownForm!: FormGroup;

  constructor(private RestResponseService: RestResponseService, private _formBuilder: FormBuilder, private router: Router, private http: HttpClient, private sanitizer: DomSanitizer, private datePipe: DatePipe, private RestQuestionnaireService: RestQuestionnaireService, private RestProductService: RestProductService) {
    this.AddAnswerForm = this._formBuilder.group({
      title: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
      order: ['',],
      published: ['',],
      Questionnaire: ['', Validators.required],
      Products: [this.I_ListPreparation, this.I_ListSuppliments, this.C_ListPreparation, this.C_ListSuppliments],
     
      C_preparation :[this.I_ListPreparation],
      I_preparation :[this.C_ListPreparation],
      C_suppliment :[this.I_ListSuppliments],
      I_suppliment :[this.C_ListSuppliments],
    });
   
  }

  async ngOnInit(): Promise<void> {

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
            this.I_dropdownListPreparation = tmp;
            this.C_dropdownListPreparation = tmp;
          }
          else {

            tmp2.push(x[i].name);
            this.I_dropdownListSuppliments = tmp2;
            this.C_dropdownListSuppliments = tmp2;
          }
        }
        console.log(this.I_dropdownListSuppliments)
      })

  

  }
  get f() {
    return this.AddAnswerForm.controls;
  }

  async AddAnswer() {
this.I_ListPreparation.forEach(element =>this.SelectedProducts.push({'name': element, 'indication' : true}) );
this.I_ListSuppliments.forEach(element =>this.SelectedProducts.push({'name': element, 'indication' : true}) );
this.C_ListPreparation.forEach(element =>this.SelectedProducts.push({'name': element, 'indication' : false}) );
this.C_ListSuppliments.forEach(element =>this.SelectedProducts.push({'name': element, 'indication' : false}) );
console.log(this.SelectedProducts)
    this.AddAnswerForm.controls.Products.patchValue(this.SelectedProducts);
    let data = this.AddAnswerForm.value;
    //console.log(data)
    (await this.RestResponseService.AddAnswers(data)).subscribe(
      response => {
        this.successNotification();
        this.router.navigate(['/admin/answers/Listeanswers'])
      },
      err => {
        console.log(err),
          this.failNotification()
      }
    )
  }
  failNotification() {
    Swal.fire('cet ordre est déjà utilisé ', 'veuillez verifier votre information', 'error')
  }

  successNotification() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Réponse ajouté avec succées',
      showConfirmButton: false,
      timer: 1500
    })
  }
  checkValue(event: any) {
  }
  changeQuestionnaire(e: any) {
    this.Activity?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  get Activity() {
    return this.AddAnswerForm.get('quest');
  }
  ErrorAddAnswerNotification() {
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: 'vous ne pouvez pas ajouter cet élément ! \n veuillez le décocher',
      showConfirmButton: false,
      timer: 1500
    })
  }

}
