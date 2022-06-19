import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { RestUserService, User } from 'src/app/client/Services/RestUser.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {
  id!: number;
  
   first_name!:string;
    last_name!:string;
     email!:string;
      typeUser!:string;
     birth_date !:string;
     occupation!:string;
     entreprise !:string;
     adresse!:string;
     country!:string;
     codePostale!:string;
     createdAt!:string;
     endDate!:string
     modifiedAt!:string;
 
  constructor(private _liveAnnouncer: LiveAnnouncer, private route: ActivatedRoute, private router: Router, private RestUserService: RestUserService, private datePipe :DatePipe ) {

  }

  @ViewChild(MatSort) sort!: MatSort;

  async ngOnInit() {
    (await this.RestUserService.getUser(localStorage.getItem('user to manage'))).subscribe(
      response => {
        console.log(response)    
            localStorage.setItem("usertoupdate",JSON.stringify(response))
            this.getInfoUser()

      })
  }
  async getInfoUser(){
   
      //this.datePipe.transform(response[0]['birthDate']['timestamp'] * 1000.05, 'dd/MM/yyyy'
    this.first_name= JSON.parse(localStorage.getItem('usertoupdate')!)[0]['first_name'],
    this.last_name= JSON.parse(localStorage.getItem('usertoupdate')!)[0]['last_name'],
    this.email= JSON.parse(localStorage.getItem('usertoupdate')!)[0]['email'],
    this.typeUser= JSON.parse(localStorage.getItem('usertoupdate')!)[0]['type_user'],
    this.birth_date=this.datePipe.transform(JSON.parse(localStorage.getItem('usertoupdate')!)[0]['birth_date'], 'dd/MM/yyyy')!
    this.occupation= JSON.parse(localStorage.getItem('usertoupdate')!)[0]['occupation'],
    console.log(this.birth_date)
    this.entreprise= JSON.parse(localStorage.getItem('usertoupdate')!)[0]['entreprise'],
    this.adresse= JSON.parse(localStorage.getItem('usertoupdate')!)[0]['adresse'],
    this.country= JSON.parse(localStorage.getItem('usertoupdate')!)[0]['country'],
    this.codePostale= JSON.parse(localStorage.getItem('usertoupdate')!)[0]['codePostale'],
    this.createdAt= this.datePipe.transform(JSON.parse(localStorage.getItem('usertoupdate')!)[0]['created_at'], 'dd/MM/yyyy')!
    this.modifiedAt=this.datePipe.transform(JSON.parse(localStorage.getItem('usertoupdate')!)[0]['modified_at'], 'dd/MM/yyyy')!
    this.endDate=this.datePipe.transform(JSON.parse(localStorage.getItem('usertoupdate')!)[0]['end_date'], 'dd/MM/yyyy')!

  }

  

}