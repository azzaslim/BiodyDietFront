import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormControl,FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userData= new FormGroup({
    username : new FormControl(''),
    password : new FormControl('')
    });
    
constructor(private authService:AuthService ,private router:Router, private formBuilder : FormBuilder,  ) { 
}
  ngOnInit() {   

  }
signIn(){
  let data = JSON.stringify(this.userData.value);
  this.authService.login(data)
  .subscribe(
    response=> {
      this.router.navigate(['/home']),
      sessionStorage.setItem('jwt', JSON.stringify(response)),
      sessionStorage.setItem('isLoggedIn', "true"),
      console.log(sessionStorage.getItem('isLoggedIn'));
      console.log(sessionStorage.getItem('jwt'));},
    err => console.log(err),
  )
    }
}