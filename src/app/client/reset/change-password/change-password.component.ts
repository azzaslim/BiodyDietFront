import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ConfirmedValidator } from 'src/app/client/Validator-Password/confirmed-validator';
import { AuthService } from '../../Services/RestUser.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  token!: string;
  formGroup?: FormGroup;

  userData: FormGroup = new FormGroup({});


  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute) {
    this.userData = formBuilder.group({

      password: ['', [Validators.required]],
      confirm_pass: ['', [Validators.required]]
    },
      {
        validator: ConfirmedValidator('password', 'confirm_pass')
      })
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params.token;
    localStorage.setItem('token', id);
  }
  get f() {
    return this.userData.controls;
  }
  reset() {

    let data = JSON.stringify(this.userData.value);
    this.authService.change_password(data)
      .subscribe(
        response => {
          this.router.navigate(['']),
            localStorage.removeItem('token'),
            this.successNotification()
        },
        err => {
          console.log(err);
        }
      )
    localStorage.clear();

  }
  successNotification() {
    Swal.fire( 'votre mot de passe a été changé avec succés !!', 'success');
  }
}
