import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RestPatientService } from '../Services/Rest-patient.service';
import { RestUserService } from '../Services/RestUser.service';
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
  role!: string;
  constructor(private RestUserService: RestUserService,private RestPatientService: RestPatientService, private router: Router, private formBuilder: FormBuilder) {
  }
  ngOnInit() {

  }
  signIn() {
    let data = JSON.stringify(this.userData.value);
    this.RestUserService.login(data)
      .subscribe(
        async response => {
          localStorage.setItem('jwt', response['token']),
          sessionStorage.setItem('isLoggedIn', "true"),
          localStorage.setItem("currentUser", (JSON.stringify(await this.RestUserService.getProfile())));
          this.role = JSON.parse(localStorage.getItem('currentUser')!).role
          if (this.role == 'ROLE_ADMIN') {
            this.returnNBPatients();
            this.returnNBUser();
            this.router.navigate(['/admin/home'])
         
          }
          else
            this.router.navigate(['/home'])
        },
        err => {
          console.log(err),
          this.failNotification()
        })
  }
  async returnNBPatients() {
    (await this.RestPatientService.getAllPatients()).subscribe((x) => {
      localStorage.setItem('nbPatients', JSON.stringify(x.length))
    })
  }
  async returnNBUser() {
    (await this.RestUserService.getUsers()).subscribe((x) => {
      localStorage.setItem("nbusers", x.length.toString())
    }
    )
  }

  failNotification() {
    Swal.fire('email ou mot de passe est incorrect', 'veuillez verifiez votre coordonnées !!', 'error');
  }



}


