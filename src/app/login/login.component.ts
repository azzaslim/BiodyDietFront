import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormControl,FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  userData= new FormGroup({
    username : new FormControl(''),
    password : new FormControl('')
    });
constructor(private authService:AuthService ,private router:Router) { 
}
signIn(){
  let data = JSON.stringify(this.userData.value);
  this.authService.login(data)
  .subscribe(
    response=> {console.log(response), this.router.navigate(['/'])},
    err => console.log(err),
  )

  

}
}