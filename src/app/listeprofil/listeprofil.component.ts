import { Component, OnInit } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AddPatientService, Profil } from '../client/Services/Rest-patient.service';
import { AuthService } from '../client/Services/RestUser.service';



@Component({
  selector: 'app-listeprofil',
  templateUrl: './listeprofil.component.html',
  styleUrls: ['./listeprofil.component.css']
})
export class ListeprofilComponent implements OnInit {


 

  displayedColumns = ['id','firstName','lastName','birthDate'];

  dataSource = new MatTableDataSource<Profil>();

  constructor(private _liveAnnouncer: LiveAnnouncer, private router: Router, private user: AddPatientService, private authService: AuthService) {

  }

  @ViewChild(MatSort) sort!: MatSort;

   async ngOnInit() {
    (await this.user.getPatients()).subscribe((x) => {
      this.dataSource = new MatTableDataSource(x);
      console.log(x);
      this.dataSource.sort = this.sort;

    },
      err => {
        this.authService.logout(),
        console.log(err),
        this.failNotification();
       // this.showToasterError();
      
    }
    )
  };
  announceSortChange(sortState: Sort) {

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  failNotification() {
    Swal.fire('votre session a expiré', 'veuillez reconnecter s\' il vous plait  !!', 'error');
  }
  confirmBox(){
    Swal.fire({
      title: 'votre session a expirée',
      text: 'veuillez reconnecter s\' il vous plait  !!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ok!',
    }).then((result) => {
     
        this.authService.logout()
      
    })
  }
}