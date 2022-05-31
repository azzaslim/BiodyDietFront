import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RestPatientService } from '../Services/Rest-patient.service';
import { RestQuestionnaireService } from '../Services/rest-questionnaire.service';
import { RestResponseService } from '../Services/rest-response.service';
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
  constructor(private RestUserService: RestUserService, private RestPatientService: RestPatientService, private router: Router, private formBuilder: FormBuilder, private RestQuestionnaireService: RestQuestionnaireService, private RestResponseService: RestResponseService) {
  }
  ngOnInit() {

  }
  signIn() {
    let data = JSON.stringify(this.userData.value);
    this.RestUserService.login(data)
      .subscribe(
        async response => {
          localStorage.setItem('jwt', response['token']),
/* 
          (await this.RestPatientService.getAllPatients()).subscribe(
            Response => {
              localStorage.setItem('nbPatients', JSON.stringify(Response.length))
              console.log(Response)
            });
            (await this.RestQuestionnaireService.getQuestionnaires()).subscribe(
              Response => {
                localStorage.setItem('nbQuestionnaire', JSON.stringify(Response.length))
                console.log(Response)
              }); */

              /* (await this.RestResponseService.getAnswers()).subscribe(
                Response => {
                  localStorage.setItem('nbResponse', JSON.stringify(Response.length))
                  console.log(Response)
                });
 */
            /* (await this.RestUserService.getUsers()).subscribe((x) => {
              localStorage.setItem("nbusers", x.length.toString())
            }) */
          localStorage.setItem("currentUser", (JSON.stringify(await this.RestUserService.getProfile())));

          this.role = JSON.parse(localStorage.getItem('currentUser')!).role
          if (this.role == 'ROLE_ADMIN') {
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

  failNotification() {
    Swal.fire('email ou mot de passe est incorrect', 'veuillez verifiez votre coordonnées !!', 'error');
  }



}


