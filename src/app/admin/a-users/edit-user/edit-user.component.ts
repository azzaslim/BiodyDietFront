import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RestUserService, User } from 'src/app/client/Services/RestUser.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

 
Nom!:string;
Prenom!:string;
CurrentUser !: FormGroup;


  constructor(private RestUserService: RestUserService,private _formBuilder: FormBuilder,private router: Router,private http: HttpClient,private sanitizer: DomSanitizer, private datePipe: DatePipe) { 
    
    this.CurrentUser = this._formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
      birthDate: ['', [Validators.required, Validators.pattern('^(((0[1-9]|[12][0-9]|30)[-/]?(0[13-9]|1[012])|31[-/]?(0[13578]|1[02])|(0[1-9]|1[0-9]|2[0-8])[-/]?02)[-/](?:19|20)[0-9]{2}|29[-/]?02[-/](?:19|20)[0-9]{2})$')]],
      occupation: [, Validators.required],
      codePostale: [, Validators.required],
      adresse: [, Validators.required],
      entreprise: [, Validators.required],
      country: [, Validators.required],
      type: [, Validators.required],
      endDate: [, Validators.required],

    });

  }

  async ngOnInit() {
    (await this.RestUserService.getUser(localStorage.getItem('user to manage'))).subscribe(
      response => {
        console.log(response)    
            localStorage.setItem("usertoupdate",JSON.stringify(response))
            this.CurrentUser = this._formBuilder.group({
              firstName: [JSON.parse(localStorage.getItem('usertoupdate')!)[0]['firstName']],
              lastName: [JSON.parse(localStorage.getItem('usertoupdate')!)[0]['lastName']],
              occupation: [JSON.parse(localStorage.getItem('usertoupdate')!)[0]['occupation']], 
        
              codePostale:[JSON.parse(localStorage.getItem('usertoupdate')!)[0]['codePostale']],
              adresse: [JSON.parse(localStorage.getItem('usertoupdate')!)[0]['adresse']],
              entreprise: [JSON.parse(localStorage.getItem('usertoupdate')!)[0]['entreprise']],
              country: [JSON.parse(localStorage.getItem('usertoupdate')!)[0]['country']],
              birthDate: [this.datePipe.transform(JSON.parse(localStorage.getItem('usertoupdate')!)[0]['birthDate'], 'dd/MM/yyyy')!],
              type: [JSON.parse(localStorage.getItem('usertoupdate')!)[0]['typeUser']], 
              endDate: [JSON.parse(localStorage.getItem('usertoupdate')!)[0]['endDate']], 
        
            });

      })

}


  async updateUser(){
  let data = this.CurrentUser.value;
  console.log(data),
  (await this.RestUserService.updateUser(data))
    .subscribe(
      (      response: any) => {
        console.log(response),
        localStorage.setItem('usertoupdate',JSON.stringify(response))
        this.successNotification(),
        this.router.navigate(['/admin/users/listeusers'])
},


    )
}

successNotification() {
  Swal.fire( 'votre informations ont été changés avec succés !!', 'success');
}
}

