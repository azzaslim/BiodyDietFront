import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ConfirmedValidator } from '../confirmed-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  message!: string;  
  formGroup?: FormGroup;
  minPw = 8;
  returnUrl!: string;  

  /*
    registerData= new FormGroup({
      firstName: new FormControl('' ,[Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      birthDate: new FormControl('', [Validators.required]),
      occupation: new FormControl('', [Validators.required]),
      country : new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),  
          password:new FormControl('', [ Validators.required]),
          confirm_pass: new FormControl('', [ Validators.required]),
    }
      )
    
  */
      registerData : FormGroup =new FormGroup({});
  constructor(private authService:AuthService ,private router:Router, private formBuilder : FormBuilder,  ) { 

    this.registerData=formBuilder.group({
      firstName:['',[Validators.required]],
      lastName:['',[Validators.required]],
      birthDate:['',[Validators.required]],
      occupation:['',[Validators.required]],
      country:['',[Validators.required]],
      email:['',[Validators.required]],
      password:['',[Validators.required]],
      confirm_pass:['',[Validators.required]]
    },
    {
      validator: ConfirmedValidator('password','confirm_pass')   
     } )
  }
  
    ngOnInit() {   
   
    }
  SaveForm(){

  }
    get f() {
      return this.registerData.controls;
    }
  register(){
    
    let data = this.registerData.value
    
    this.authService.register(data)
    .subscribe(
      response=> {
        this.router.navigate(['/'])
      },
      err => console.log(err),
    )
      }

}
