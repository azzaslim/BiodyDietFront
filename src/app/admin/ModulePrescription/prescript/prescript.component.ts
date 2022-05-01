import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestPatientService } from 'src/app/client/Services/Rest-patient.service';
import { RestUserService } from 'src/app/client/Services/RestUser.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prescript',
  templateUrl: './prescript.component.html',
  styleUrls: ['./prescript.component.css']
})
export class PrescriptComponent implements OnInit {

  nbusers!: string;
  nbPatients!: string;
  constructor(private RestUserService: RestUserService,private RestPatientService : RestPatientService , router: Router) { }

  async ngOnInit() {
    this.nbPatients = localStorage.getItem('nbPatients')!;
    this.nbusers = localStorage.getItem('nbusers')!
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