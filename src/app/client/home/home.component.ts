import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RestUserService } from '../Services/RestUser.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private RestUserService:RestUserService,private datePipe: DatePipe) { }
  
  async ngOnInit(): Promise<void> {
    localStorage.removeItem('nom');
    localStorage.removeItem('prenom');

    localStorage.removeItem('profil');
    localStorage.removeItem('Pid');
    localStorage.removeItem('Pnom');
    localStorage.removeItem('Pprenom');
    localStorage.removeItem('BirthDate');
    localStorage.removeItem('height');
    localStorage.removeItem('weight');
    localStorage.removeItem('Birthdate');
    localStorage.removeItem('Height');
    localStorage.removeItem('Weight');
    localStorage.removeItem('gender');
    localStorage.removeItem('activity');
    localStorage.removeItem('entrepriseCheck');
    localStorage.removeItem('villeCheck');
    localStorage.removeItem('logoCkeck');
    localStorage.removeItem('nomCheck');
    localStorage.removeItem('prescriptionCheck');
    localStorage.removeItem('logoCheck');

    
  }
  calculateDiff(dateSent: string | number | Date){
    let currentDate = new Date();
    dateSent = new Date(JSON.parse(localStorage.getItem('currentUser')!).endDate);
console.log(Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) ) /(1000 * 60 * 60 * 24)))
    return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) ) /(1000 * 60 * 60 * 24));
}

}
