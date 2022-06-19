import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RestQuestionnaireService } from 'src/app/client/Services/rest-questionnaire.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-questionnaire',
  templateUrl: './edit-questionnaire.component.html',
  styleUrls: ['./edit-questionnaire.component.css']
})
export class EditQuestionnaireComponent implements OnInit {

  Nom!:string;
  Prenom!:string;
  UpdateQuest !: FormGroup;
  isChecked!:boolean;

  
  
    constructor(private RestQuestionnaireService: RestQuestionnaireService,private _formBuilder: FormBuilder,private router: Router,private http: HttpClient,private sanitizer: DomSanitizer, private datePipe: DatePipe) { 
      
      this.UpdateQuest = this._formBuilder.group({
        title: ['', [Validators.required]],
        order: ['', [Validators.required]],
        ispublished: [''],

  
      });
  
    }
  
    async ngOnInit() {
      (await this.RestQuestionnaireService.getQuestionnaire(localStorage.getItem('questionnaire to manage'))).subscribe(
        response => {
          console.log(response)    
              this.UpdateQuest = this._formBuilder.group({
                title: [JSON.parse(localStorage.getItem('questionnairetoupdate')!)[0]['title']],
                order: [JSON.parse(localStorage.getItem('questionnairetoupdate')!)[0]['ordering']],
                ispublished: [JSON.parse(localStorage.getItem('questionnairetoupdate')!)[0]['is_published']], 
          
                
          
              });
  
        })
  
  }
  
  
    async updateQuestionnaire(){
    let data = this.UpdateQuest.value;
    console.log(data),
    (await this.RestQuestionnaireService.updateQuestionnaire(data))
      .subscribe(
        (      response: any) => {
          console.log(response),
          localStorage.setItem('questionnairetoupdate',JSON.stringify(response))
          this.successNotification(),
          this.router.navigate(['/admin/questionnaire/Listequestionnaire'])
  },
  
  
      )
  }
  
  successNotification() {
    Swal.fire( 'votre informations ont été changés avec succés !!', 'success');
  }
  checkValue(event: any) {
  }
  }
  
  