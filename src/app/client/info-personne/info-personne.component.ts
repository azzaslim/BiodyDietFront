import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestPatientService, Profil } from '../Services/Rest-patient.service';
import { RestUserService } from '../Services/RestUser.service';

@Component({
  selector: 'app-info-personne',
  templateUrl: './info-personne.component.html',
  styleUrls: ['./info-personne.component.css']
})
export class InfoPersonneComponent implements OnInit {
  title=["nouvelle prescription","Questionnaire","Prescriptions compléments","impression"];
  panelOpenState0= false;
  panelOpenState = false;
  panelOpenState1 = false;
  panelOpenState2 = false;
  panelOpenState3 = false;
  panelOpenState4 = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  id!:number;
  nom!:string;
  prenom!:string;
  profil!:string;


  constructor(private _formBuilder: FormBuilder,private route: ActivatedRoute, private router: Router, private user:  RestPatientService, private RestUserService: RestUserService) {
    
  }
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
    this.id = this.route.snapshot.params['id'];
    this.GetOnePatient();
}



  public onStepChange(event: any): void {
    console.log(event.selectedIndex);
  }


  async GetOnePatient(){

    (await this.user.getOnePatient(this.id))
      .subscribe(
        response => {
          console.log(response);
        localStorage.setItem('nom',response[0]['firstName']),
        localStorage.setItem('prenom',response[0]['lastName'])
          this.nom=localStorage.getItem('nom')!+"  ";
          this.prenom=localStorage.getItem('prenom')!
          this.profil=this.nom.concat(this.prenom)!
        },
        err => console.log(err),
      )
  }
}