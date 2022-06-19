import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { async } from 'rxjs';
import { RestUserService } from 'src/app/client/Services/RestUser.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
 
Nom!:string;
Prenom!:string;
AddUserForm !: FormGroup;


  constructor(private RestUserService: RestUserService,private _formBuilder: FormBuilder,private router: Router,private http: HttpClient,private sanitizer: DomSanitizer, private datePipe: DatePipe) { 
    
    this.AddUserForm = this._formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
      birthDate: ['',],
      occupation: [, Validators.required],
      codePostale: [, Validators.required],
      adresse: [, Validators.required],
      entreprise: [, Validators.required],
      country: [, Validators.required],
      type: [, Validators.required],
      endDate: [, Validators.required],
      password :[,Validators.required],
      email :[,Validators.required],

    });

  }

  async ngOnInit() {
  
}


get f() {
  return this.AddUserForm.controls;
}
AddUser() {

  let data = this.AddUserForm.value
const prasedDate = Date.parse(this.AddUserForm.get('birthDate')!.value)

/* if ((typeof (this.registerData.get('firstName')!.value) && 
(this.registerData.get('lastName')!.value)&& 
(this.registerData.get('country')!.value) &&
(this.registerData.get('occupation')!.value) &&
(this.registerData.get('entreprise')!.value)
!== 'string')) {

alert("veuillez entrer des informations corrects")
}
if ((typeof (this.registerData.get('codePostale')!.value) === null) )
alert("entrez un valide code postale") */
  this.RestUserService.AddUser(data)
    .subscribe(
      response => {
        this.successNotification() ;
        this.router.navigate(['/admin/users/listeusers'])
        
      },
      err => {console.log(err),
      this.failNotification()}
    )

}
failNotification(){
  Swal.fire('cet email est déjà utilisé ','veuillez verifier votre information','error')
}

successNotification() {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Utilisateur ajouté avec succées',
    showConfirmButton: false,
    timer: 1500
  })}
}

