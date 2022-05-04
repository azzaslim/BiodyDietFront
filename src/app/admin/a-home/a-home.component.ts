import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-a-home',
  templateUrl: './a-home.component.html',
  styleUrls: ['./a-home.component.css']
})
export class AHomeComponent implements OnInit {
     nbusers= localStorage.getItem('nbusers');
     nbnutrients= localStorage.getItem('nbnutrients');
     nbsymptoms=localStorage.getItem('nbsymptoms');
    
  constructor() { }

  ngOnInit(): void {
  }

}
