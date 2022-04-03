import { StepperSelectionEvent } from '@angular/cdk/stepper/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatHorizontalStepper, MatStepper } from '@angular/material/stepper/stepper';
import { Router } from '@angular/router';
import { AddPatientService } from '../Services/add-patient.service';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent implements OnInit {
  panelOpenState0= false;
  panelOpenState = false;
  panelOpenState1 = false;
  panelOpenState2 = false;
  panelOpenState3 = false;
  panelOpenState4 = false;
  patientForm!: FormGroup;
  questionnaireForm !: FormGroup;
  
  constructor(private _formBuilder: FormBuilder,private router: Router, private AddPatientService: AddPatientService) {}
//Validators.required
  ngOnInit() {

    this.patientForm = this._formBuilder.group({
      firstName: [''],
      lastName: [''],
      birth_date: [''],
      weight: [''],
      height: [''],
    });
    this.questionnaireForm =  this._formBuilder.group({
      first: [''],
      second: [''],
      third: [''],
      forth: [''],
      
    });

    
  
  }
 

  onSubmit(){
    console.log(this.questionnaireForm.value);
  }

    

  async register(){
  
  let data = this.patientForm.value;
  (await this.AddPatientService.register(data))
  .subscribe(
    response=> { 
    },
    err => console.log(err),
  )




    }
 
}