import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmedValidator } from '../Validator-Password/confirmed-validator';
import { RestUserService } from '../Services/RestUser.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formGroup?: FormGroup;
  registerData: FormGroup = new FormGroup({});

  constructor(private RestUserService: RestUserService, private router: Router, private formBuilder: FormBuilder,) {

    this.registerData = formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      occupation: ['', [Validators.required]],
      country: ['', [Validators.required]],
      adresse:['',[Validators.required]],
      entreprise:['',[Validators.required]],
      codePostale:['',[Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirm_pass: ['', [Validators.required]]
    },
      {
        validator: ConfirmedValidator('password', 'confirm_pass')
      })
  }

  ngOnInit() { }

  get f() {
    return this.registerData.controls;
  }
  register() {

    let data = this.registerData.value
 const prasedDate = Date.parse(this.registerData.get('birthDate')!.value)
if (isNaN(prasedDate) || this.registerData.get('birthDate')!.value.length < 10) {
  alert("date de naissance doit etre sous la forme dd-mm-aaaa ou dd/mm/aaaa")
}
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
  else {
    this.RestUserService.register(data)
      .subscribe(
        response => {
          this.router.navigate(['/'])
        },
        err => {console.log(err),
        this.failNotification()}
      )
  }
}
  failNotification(){
    Swal.fire('cet email est déjà utilisé ','veuillez verifier votre information','error')
  }
}
