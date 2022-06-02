import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RestPatientService } from 'src/app/client/Services/Rest-patient.service';
import { RestQuestionnaireService } from 'src/app/client/Services/rest-questionnaire.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-questionnaire',
  templateUrl: './add-questionnaire.component.html',
  styleUrls: ['./add-questionnaire.component.css']
})
export class AddQuestionnaireComponent implements OnInit {
  AddQuestionnaireForm!: FormGroup;
  isChecked!:boolean;

  constructor(private RestQuestionnaireService: RestQuestionnaireService,private _formBuilder: FormBuilder,private router: Router,private http: HttpClient,private sanitizer: DomSanitizer, private datePipe: DatePipe) { 
    this.AddQuestionnaireForm = this._formBuilder.group({
      title: ['', [Validators.required]],
      order: ['', ],
      published:['',]
      
     
      

    });
  }

  ngOnInit(): void {
  }
  get f() {
    return this.AddQuestionnaireForm.controls;
  }
  async AddPatient() {
  
    let data = this.AddQuestionnaireForm.value;
  
    (await this.RestQuestionnaireService.AddQuestionnaire(data))
      .subscribe(
        response => {
          this.successNotification() ;
         // this.router.navigate(['/admin/home'])
          
        },
        err => {console.log(err),
        this.failNotification()}
      )
  }
  failNotification(){
    Swal.fire('cet ordre est déjà utilisé ','veuillez changer','error')
  }
  
  successNotification() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Patient ajouté avec succées',
      showConfirmButton: false,
      timer: 1500
    })}
    checkValue(event: any) {
    }
}
