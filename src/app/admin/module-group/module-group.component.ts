import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-module-group',
  templateUrl: './module-group.component.html',
  styleUrls: ['./module-group.component.css']
})
export class ModuleGroupComponent implements OnInit {
  nbusers!: string;
  nbPatients!: string;
  nbnutrient!: string;
  nbsymptoms!: string;
  nbsupplements!: string;
  constructor() { }
ngOnInit() {
    

  this.nbPatients = localStorage.getItem('nbPatients')!;
    this.nbusers = localStorage.getItem('nbusers')!;
    this.nbsupplements=localStorage.getItem('nbsupplements')!;
    this.nbnutrient= localStorage.getItem('nbnutrients')!;
   this.nbsymptoms=localStorage.getItem('nbsymptoms')!;
  }

}
