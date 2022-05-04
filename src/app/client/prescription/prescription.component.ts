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
      this.id = Number(localStorage.getItem('profil')!);
      (await this.user.getOnePatient(this.id))
        .subscribe(
          response => {
            console.log("response", response);
            localStorage.setItem('nom', response[0]['firstName']),
              localStorage.setItem('prenom', response[0]['lastName']),
              localStorage.setItem('BirthDate', this.datePipe.transform(response[0]['birthDate']['timestamp'] * 1000.05, 'dd/MM/yyyy')!),
              localStorage.setItem('height', response[0]['height']),
              localStorage.setItem('weight', response[0]['weight']),

              this.nom = localStorage.getItem('nom')! + "  ";
            this.prenom = localStorage.getItem('prenom')!;
            this.profil = this.nom.concat(this.prenom)!;


            this.patientForm = this._formBuilder.group({
              firstName: [localStorage.getItem('nom')!, [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
              lastName: [localStorage.getItem('prenom')!, [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
              birth_date: [localStorage.getItem('BirthDate')!, [Validators.required, Validators.pattern('^(((0[1-9]|[12][0-9]|30)[-/]?(0[13-9]|1[012])|31[-/]?(0[13578]|1[02])|(0[1-9]|1[0-9]|2[0-8])[-/]?02)[-/](?:19|20)[0-9]{2}|29[-/]?02[-/](?:19|20)[0-9]{2})$')]],
              weight: [parseFloat(localStorage.getItem('weight')!), Validators.required],
              height: [parseFloat(localStorage.getItem('height')!), Validators.required],
            });
          },
          err => console.log(err),
        )

    }
    this.patientForm = this._formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
      birth_date: ['', [Validators.required, Validators.pattern('^(((0[1-9]|[12][0-9]|30)[-/]?(0[13-9]|1[012])|31[-/]?(0[13578]|1[02])|(0[1-9]|1[0-9]|2[0-8])[-/]?02)[-/](?:19|20)[0-9]{2}|29[-/]?02[-/](?:19|20)[0-9]{2})$')]],
      weight: [, Validators.required],
      height: [, Validators.required],
    });


    this.questionnaireForm = this._formBuilder.group({
      first: [''],
      second: [''],
      third: [''],
      forth: [''],

    });


  }

  async openDialog(): Promise<void> {
    (await this.user.getPatients()).subscribe((x) => {
      // this.dataSource = new MatTableDataSource(x);
      if (x.length == 0) {
        // this.onNoClick()
        alert('no patient exist')
      }
      else {
        const dialogRef = this.dialog.open(PatientsDialogComponent, {
          width: '50%',
          height: '55%',
          data: {},
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
      }
    },

    )
  }
  get f() {
    return this.patientForm.controls;
  }
  onSubmit() {
    console.log(this.questionnaireForm.value);
  }
  async AddPatient() {
    let data = this.patientForm.value;
    const prasedDate = Date.parse(this.patientForm.get('birth_date')!.value)
    if (isNaN(prasedDate) || this.patientForm.get('birth_date')!.value.length < 10) {
      alert("date de naissance doit etre sous la forme dd-mm-aaaa ou dd/mm/aaaa")
    }
    if ((typeof (this.patientForm.get('firstName')!.value) !== 'string')) {

      alert("entrez un valide nom")
    }
    if ((typeof (this.patientForm.get('weight')!.value) === null) || (typeof (this.patientForm.get('height')!.value) === null)) {

      alert("entrez un valide poids ou longueur")
    }

    else  {
      (await this.AddPatientService.AddPatient(data))
        .subscribe(
          response => {
            this.sucessNotification()

          },
          err => {
          this.failNotification()
          }
        )
      //this.patientForm.reset()
      localStorage.removeItem('nom')
      localStorage.removeItem('prenom')
      localStorage.removeItem('height')
      localStorage.removeItem('weight')
      localStorage.removeItem('BirthDate')
    }
  }

  sucessNotification() {
   
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Patient ajouté avec succées',
      showConfirmButton: false,
      timer: 1500
    })  }
  failNotification() {
    Swal.fire({
      icon: 'info',
      title: 'Patient existe déjà !',
      text: "veuillez remplir votre questionnaire !!",
      showConfirmButton: false,
      timer: 2500

    })  }
}
