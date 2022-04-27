import { StepperSelectionEvent } from '@angular/cdk/stepper/stepper';
import { DatePipe } from '@angular/common';
import { Component, Inject, NgModule, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatHorizontalStepper, MatStepper } from '@angular/material/stepper/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { AddPatientService, Profil } from '../Services/Rest-patient.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { MatTableModule } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import Swal from 'sweetalert2';
import { MatSort, Sort } from '@angular/material/sort';
import { PatientsDialogComponent } from '../patients-dialog/patients-dialog.component';


@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent implements OnInit {
  panelOpenState0 = false;
  panelOpenState = false;
  panelOpenState1 = false;
  panelOpenState2 = false;
  panelOpenState3 = false;
  panelOpenState4 = false;
  patientForm!: FormGroup;
  questionnaireForm !: FormGroup;
  id!: number;
  nom!: string;
  prenom!: string;
  BirthDate!: Date;
  height!: number;
  weight!: number;
  profil!: string;


  constructor(private _formBuilder: FormBuilder, private router: Router, private user: AddPatientService, private route: ActivatedRoute, private AddPatientService: AddPatientService, private datePipe: DatePipe, private dialog: MatDialog) { 
    
  }
  async ngOnInit() {
    if (this.user.profilExist) {
      this.id=Number(localStorage.getItem('profil')!);
      (await this.user.getOnePatient(this.id))
      .subscribe(
        response => {
          console.log("response",response);
        localStorage.setItem('nom',response[0]['firstName']),
        localStorage.setItem('prenom',response[0]['lastName']),
        localStorage.setItem('BirthDate', response[0]['birthDate']),
        localStorage.setItem('height',response[0]['height']),
        localStorage.setItem('weight',response[0]['weight']),

          this.nom=localStorage.getItem('nom')!+"  ";
          this.prenom=localStorage.getItem('prenom')!;
          this.profil=this.nom.concat(this.prenom)!;


          this.patientForm = this._formBuilder.group({
            firstName: [localStorage.getItem('nom')!],
            lastName: [localStorage.getItem('prenom')!],
            birth_date: [localStorage.getItem('BirthDate')!],
            weight: [parseFloat(localStorage.getItem('weight')!)],
            height: [parseFloat(localStorage.getItem('height')!)],
          });
        },
        err => console.log(err),
      )
    
    } 
      this.patientForm = this._formBuilder.group({
        firstName: [''],
        lastName: [''],
        birth_date: [''],
        weight: [''],
        height: [''],
      });
    

    this.questionnaireForm = this._formBuilder.group({
      first: [''],
      second: [''],
      third: [''],
      forth: [''],

    });


  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PatientsDialogComponent, {
      width: '50%',
      height: '55%',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  onSubmit() {
    console.log(this.questionnaireForm.value);
  }
  async AddPatient() {
    console.log(this.patientForm.value)
    let data = this.patientForm.value;
    (await this.AddPatientService.AddPatient(data))

      .subscribe(
        response => {
        },
        err => console.log(err),
      )
    this.patientForm.reset()
    localStorage.removeItem('nom')
    localStorage.removeItem('prenom')
    localStorage.removeItem('height')
    localStorage.removeItem('weight')
    localStorage.removeItem('BirthDate')
    this.sucessNotification() 
  }

  sucessNotification() {
    Swal.fire('patient ajouté avec succés', 'success');
  }

}
