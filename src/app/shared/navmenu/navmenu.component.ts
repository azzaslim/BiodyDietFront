import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RestUserService } from 'src/app/client/Services/RestUser.service';
import { LoadingService } from 'src/app/loading.service';

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.css']
})
export class NavmenuComponent implements OnInit {
  homePath!: string
  role!: string
  dateSent!: any
  Days: any;
  soon!: boolean
  isAdmin = true;
  jours!:string
  endDate!: Date;
  email!:string


  constructor(private _formBuilder: FormBuilder, private router: Router, private RestUserService: RestUserService, private loader: LoadingService) { }
  async ngOnInit(): Promise<void> {
    localStorage.setItem('currentUser',JSON.stringify(await this.RestUserService.getProfile()))

    this.role = JSON.parse(localStorage.getItem('currentUser')!).role;

if (this.role == 'ROLE_USER')
    {
      let currentDate = new Date();
      this.endDate = (JSON.parse(localStorage.getItem('currentUser')!).endDate.date)!
    this.dateSent = new Date(this.endDate)
    var Time = (this.dateSent.getTime() - currentDate.getTime())
    this.Days = Math.round(Time / (1000 * 3600 * 24)); //Diference in Days
    console.log(this.Days) 
    if (this.Days<10){
      if (this.Days==1)
      {
        this.jours='jour'
        this.soon=true

      }
      else
      this.jours ='jours'
      this.soon=true
    }  } //return Math.floor((Date.UTC(currentDate.getFul

    if (this.role == 'ROLE_ADMIN') {
      this.isAdmin = false;
      this.homePath = "admin/home"
    }
    else
      this.homePath = "home"
  }
  disconnect() {
    console.log('logout');
    this.RestUserService.logout();
    localStorage.clear()
    this.router.navigate(['/'])
  }
  async calculateDiff(dateSent: string | number | Date) {
    let currentDate = new Date();
    dateSent = new Date(JSON.parse(localStorage.getItem('currentUser')!).endDate);
    console.log(Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate())) / (1000 * 60 * 60 * 24)))
    return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate())) / (1000 * 60 * 60 * 24));
  }

 

}
