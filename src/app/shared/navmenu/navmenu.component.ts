import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.css']
})
export class NavmenuComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder,private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
  }
  disconnect() {  
    console.log('logout');  
    this.authService.logout();  
    this.router.navigate(['/'])
  } 
}
