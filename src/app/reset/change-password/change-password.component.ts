import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  userData= new FormGroup({
    password : new FormControl(''),
    confirm_password : new FormControl('')
    });
    
constructor(private authService:AuthService ,private router:Router, private formBuilder : FormBuilder,  ) {  }

  ngOnInit(): void {
  }
  signIn(){
    let data = JSON.stringify(this.userData.value);
    this.authService.change_password(data)
    .subscribe(
      response=> {
        this.router.navigate(['']),
        this.successNotification()},
      err => console.log(err),
    )
      }
      successNotification() {
        Swal.fire('Hi', 'votre mot de passe a été changé avec succés !!', 'success');
      }
}
