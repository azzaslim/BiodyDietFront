import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RestUserService } from '../../Services/RestUser.service';

@Component({
  selector: 'app-verifaccount',
  templateUrl: './verifaccount.component.html',
  styleUrls: ['./verifaccount.component.css']
})
export class VerifaccountComponent implements OnInit {
  userEmail= new FormGroup({
    username : new FormControl(''),
   
    });
    
constructor(private RestUserService:RestUserService ,private router:Router, private formBuilder : FormBuilder,  ) { 
}

  ngOnInit(): void {
  }
  signIn(){
    let data = JSON.stringify(this.userEmail.value);
    console.log(data);
    this.RestUserService.verif_email(data)
    .subscribe(
      response=>{ 
      this.successNotification(),
      this.userEmail.reset();
    console.log(response)},
    
      err => {
        console.log(err),
        this.failNotification() 
        
      }

    )
      }
      successNotification() {
        Swal.fire('Hi', 'un message de verification a été envoyé à votre email !!', 'success');
      }
      failNotification() {
        Swal.fire('Hi', 'aucun utilisateur avec cet email trouvé !!', 'error');
      }
}
