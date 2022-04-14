import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../Services/RestUser.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userData = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });
  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
  }
  ngOnInit() {

  }
   signIn() {
    let data = JSON.stringify(this.userData.value);
   this.authService.login(data)
   .subscribe(
     response=> {
       this.router.navigate(['/home']),
       console.log(response),
       localStorage.setItem('jwt',response['token']),
       sessionStorage.setItem('isLoggedIn', "true"),
       console.log(localStorage.getItem('jwt'));
      
     },
     err => {console.log(err),
       this.failNotification()
     })
   }
 

  failNotification() {
    Swal.fire('email ou mot de passe est incorrect', 'veuillez verifiez votre coordonnées !!', 'error');
  }



}