import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/client/Services/RestUser.service';

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.css']
})
export class NavmenuComponent implements OnInit {
   homePath!:string
   role!:string
 
 
  constructor(private _formBuilder: FormBuilder,private router: Router, private authService: AuthService) {}
  ngOnInit(): void {
    this.role = JSON.parse(localStorage.getItem('currentUser')!).role

    if (this.role == 'ROLE_ADMIN') {
  this.homePath="admin/home"   }
    else
    this.homePath="home"   
  }
  disconnect() {  
    console.log('logout');  
    this.authService.logout();  
    this.router.navigate(['/'])
  } 
}
