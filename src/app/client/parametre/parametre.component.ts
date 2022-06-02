import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RestUserService } from '../Services/RestUser.service';
@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.component.html',
  styleUrls: ['./parametre.component.css']
})
export class ParametreComponent implements OnInit {

  homePath!:string
   role!:string
 
   isAdmin = true;

  constructor(private router: Router, private RestUserService: RestUserService) {}
  ngOnInit(): void {
    this.role = JSON.parse(localStorage.getItem('currentUser')!).role

    if (this.role == 'ROLE_ADMIN') {
      this.isAdmin =false;
  this.homePath="admin/home"  
 }
    else
    this.homePath="home"   
  }
  disconnect() {  
    console.log('logout');  
    this.RestUserService.logout();  
    this.router.navigate(['/'])
  } 
    

 

}
