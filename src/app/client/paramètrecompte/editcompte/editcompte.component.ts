import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editcompte',
  templateUrl: './editcompte.component.html',
  styleUrls: ['./editcompte.component.css']
})
export class EditcompteComponent implements OnInit {
  endDate!:string
  constructor(private datePipe : DatePipe) { }

  ngOnInit(): void {
    localStorage.removeItem('profil');
 this.endDate= this.datePipe.transform(JSON.parse(localStorage.getItem('currentUser')!).endDate.date,'dd/MM/yyyy')!
  }
}
