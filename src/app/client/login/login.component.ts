import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/loading.service';
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
  loading$ = this.loader.loading$;
  homePath!: string
  dateSent!: any
  Days: any;
  jours!: string
  email!: string
  endDate!: Date;
  constructor(private authService : RestUserService,private RestUserService: RestUserService, private RestPatientService: RestPatientService, private router: Router, private formBuilder: FormBuilder, private RestQuestionnaireService: RestQuestionnaireService, private RestResponseService: RestResponseService, public loader: LoadingService) {
  }
  ngOnInit() {
  

  }
  signIn() {
    let data = JSON.stringify(this.userData.value);
localStorage.setItem('email',this.userData.value.username)
    this.RestUserService.login(data)

      .subscribe(
        async response => {
          localStorage.setItem('jwt', response['token']),

            localStorage.setItem("currentUser", (JSON.stringify(await this.RestUserService.getProfile())));

          
          this.role = JSON.parse(localStorage.getItem('currentUser')!).role;
          (await this.RestUserService.getUsers()).subscribe((x) => {
            localStorage.setItem("nbusers", x.length.toString())
          });
          if ((this.role == 'ROLE_ADMIN') ) {
            (await this.RestPatientService.getAllPatients()).subscribe(
              Response => {
                localStorage.setItem('nbPatients', JSON.stringify(Response.length))
                console.log(Response)
              });
            (await this.RestQuestionnaireService.getQuestionnaires()).subscribe(
              Response => {
                localStorage.setItem('nbQuestionnaire', JSON.stringify(Response.length))
                console.log(Response)
              }); 

            (await this.RestResponseService.getAnswers()).subscribe(
              Response => {
                localStorage.setItem('nbResponse', JSON.stringify(Response.length))
                console.log(Response)
              });


            this.router.navigate(['/admin/home'])

          }
          else {
            let currentDate = new Date();

          this.endDate = (JSON.parse(localStorage.getItem('currentUser')!).endDate.date)!
          this.dateSent = new Date(this.endDate)
          var Time = (this.dateSent.getTime() - currentDate.getTime())
          this.Days = Math.round(Time / (1000 * 3600 * 24)); //Diference in Days
          console.log(this.Days)
        
              if (JSON.parse(localStorage.getItem('currentUser')!).subscription_status ==false)
              {
                this.alerterreur();
                this.email=localStorage.getItem('email')!
                this.loader.hide();
              }
              else if (JSON.parse(localStorage.getItem('currentUser')!).subscription_status !==false||(this.Days > 0))
              {this.router.navigate(['/home'])}
              else 
            {  this.email=localStorage.getItem('email')!
              this.alerterreur()
              this.loader.hide()}
          }
        },

        err => {
          console.log(err),
            this.loader.hide()

          this.failNotification()
        })
    this.loader.show();

  }

  failNotification() {
    Swal.fire('email ou mot de passe est incorrect', 'veuillez verifiez votre coordonnées !!', 'error');
  }
alerterreur(){
  Swal.fire({
    title: 'votre abonnement est expiré ',
    icon: 'warning',
    text: 'voulez voue le renouveler !',
    showCancelButton: true,
    confirmButtonText: 'Payer',
    denyButtonText: `Non Merci `,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      localStorage.removeItem('currentUser')
      this.pay()
      

console.log(this.email)





    } else if (result.isDenied) {
      this.router.navigate(['/'])
    }
  })
  }
  async pay(){
    console.log(this.email)
    this.loader.show()
   await this.authService.payment(this.email).subscribe(
    Response => {
      console.log(Response)
         window.location.href = Response
this.loader.hide()
    },
    err=>
    {
      console.log(err)
    });
}


}


