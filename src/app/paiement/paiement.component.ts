import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RestUserService } from '../client/Services/RestUser.service';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit {

  constructor(private router: Router,private RestUserService: RestUserService) { }

  ngOnInit(): void {
    if ((localStorage.getItem('advance'))=='oui')
    {
      this.payementAdvance()
      this.router.navigate(['/editCompte'])

    }
    else{
      this.payement()

      this.router.navigate(['/'])
    }

this.failNotification()
  }
  failNotification() {
    Swal.fire('Votre compte est actif de nouveau', 'vous pouvez accéder !!', 'success');
  }
  payement(){
    this.RestUserService.renouvelleAccount(localStorage.getItem('email')).subscribe(
      Response => {
        console.log(Response)
        window.location.reload();
        //localStorage.removeItem('email')
      })

  }
  payementAdvance(){
    this.RestUserService.renouvelleAccountAdvance
    (localStorage.getItem('email')).subscribe(
      Response => {
        console.log(Response)
        window.location.reload();
        //localStorage.removeItem('email')
      })

  }

}
