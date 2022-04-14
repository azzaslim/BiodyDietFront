import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmedValidator } from '../Validator-Password/confirmed-validator';
import { AuthService } from '../Services/RestUser.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formGroup?: FormGroup;
  registerData: FormGroup = new FormGroup({});

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder,) {

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
console.log(data)
    this.authService.register(data)

      .subscribe(
        response => {
          this.router.navigate(['/'])
        },
        err => console.log(err),
      )
  }

}