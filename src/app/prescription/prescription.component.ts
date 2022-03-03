import { StepperSelectionEvent } from '@angular/cdk/stepper/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatHorizontalStepper, MatStepper } from '@angular/material/stepper/stepper';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
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
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  
  constructor(private _formBuilder: FormBuilder,private router: Router, private authService: AuthService) {}
//Validators.required
  ngOnInit() {

    this.firstFormGroup = this._formBuilder.group({
      firstName: [''],
      lastName: [''],
      birthDate: [''],
      weight: [''],
      height: [''],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    
  
  }
  
 
}