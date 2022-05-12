import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RestPatientService } from 'src/app/client/Services/Rest-patient.service';
import { RestUserService } from 'src/app/client/Services/RestUser.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {
 
  Nom!:string;
  Prenom!:string;
  AddPatientForm !: FormGroup;
  Activities: any = ["choisir un niveau d\'activité",'très faible', 'faible', 'Moyenne', 'forte','très forte'];

  
    constructor(private RestPatientService: RestPatientService,private _formBuilder: FormBuilder,private router: Router,private http: HttpClient,private sanitizer: DomSanitizer, private datePipe: DatePipe) { 
      
      this.AddPatientForm = this._formBuilder.group({
        firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
        lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
        birth_date: ['', [Validators.required, Validators.pattern('^(((0[1-9]|[12][0-9]|30)[-/]?(0[13-9]|1[012])|31[-/]?(0[13578]|1[02])|(0[1-9]|1[0-9]|2[0-8])[-/]?02)[-/](?:19|20)[0-9]{2}|29[-/]?02[-/](?:19|20)[0-9]{2})$')]],
        weight: [, Validators.required],
        codePostale: [, Validators.required],
        adresse: [, Validators.required],
        height: [, Validators.required],
        country: [, Validators.required],
        type: [, Validators.required],
        Activity: [this.Activities[0], Validators.required],
       
        
  
      });
  
    }
  
    async ngOnInit() {
    
  }
  
  changeActivity(e: any) {
    this.Activity?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  get Activity() {
    return this.AddPatientForm.get('Activity');
  }
  get f() {
    return this.AddPatientForm.controls;
  }
  async AddPatient() {
  
    let data = this.AddPatientForm.value
  const prasedDate = Date.parse(this.AddPatientForm.get('birth_date')!.value)
  if (isNaN(prasedDate) || this.AddPatientForm.get('birth_date')!.value.length < 10) {
  alert("date de naissance doit etre sous la forme dd-mm-aaaa ou dd/mm/aaaa")
  }

  else {
    (await this.RestPatientService.AddPatient(data))
      .subscribe(
        response => {
          this.successNotification() ;
          this.router.navigate(['/admin/home'])
          
        },
        err => {console.log(err),
        this.failNotification()}
      )
  }
  }
  failNotification(){
    Swal.fire('cet email est déjà utilisé ','veuillez verifier votre information','error')
  }
  
  successNotification() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Patient ajouté avec succées',
      showConfirmButton: false,
      timer: 1500
    })}
  }
  
  