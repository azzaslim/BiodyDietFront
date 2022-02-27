import { StepperSelectionEvent } from '@angular/cdk/stepper/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatHorizontalStepper } from '@angular/material/stepper/stepper';
@Component({
  selector: 'app-ajoutform',
  templateUrl: './ajoutform.component.html',
  styleUrls: ['./ajoutform.component.css']
})
export class AjoutformComponent implements OnInit {
  title=["nouvelle prescription","Questionnaire","Prescriptions compléments","impression"];
  panelOpenState0= false;
  panelOpenState = false;
  panelOpenState1 = false;
  panelOpenState2 = false;
  panelOpenState3 = false;
  panelOpenState4 = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}
//Validators.required
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: [''],
      secondCtrl: [''],
      thirdCtrl: [''],
      fourthCtrl: [''],
      fivthCtrl: [''],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    
    
  }
  public onStepChange(event: any): void {
    console.log(event.selectedIndex);
  }
}