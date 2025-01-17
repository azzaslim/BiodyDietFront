import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestPatientService } from 'src/app/client/Services/Rest-patient.service';
import { RestUserService } from 'src/app/client/Services/RestUser.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-a-home',
  templateUrl: './a-home.component.html',
  styleUrls: ['./a-home.component.css']
})
export class AHomeComponent implements OnInit {


  nbusers!: string;
  nbPatients!: string;
  nbsupplements!:string;
  nbnutrient!:string;
  nbsymptoms!:string;
  nbQuestionnaire!:string;
  nbresponse!:string;
  constructor(private RestUserService: RestUserService,private RestPatientService : RestPatientService , router: Router) { }

  async ngOnInit() {
    this.nbPatients = localStorage.getItem('nbPatients')!;
    this.nbusers = localStorage.getItem('nbusers')!;
    this.nbQuestionnaire = localStorage.getItem('nbQuestionnaire')!

    this.nbusers= localStorage.getItem('nbusers')!;
   this.nbnutrient= localStorage.getItem('nbnutrients')!;
   this.nbsymptoms=localStorage.getItem('nbsymptoms')!;
   this.nbQuestionnaire = localStorage.getItem('nbQuestionnaire')!
//this.nbsupplements=localStorage.getItem('nbsupplements');
  }

  FailNotification() {
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: 'vous n\'avez le droit vers cette page',
      showConfirmButton: false,
      timer: 1500
    })
  }
}
