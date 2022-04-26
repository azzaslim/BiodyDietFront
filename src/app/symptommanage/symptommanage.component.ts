import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { Symptom } from '../auth.service';
import { MatSort, Sort } from '@angular/material/sort';
import { AddPatientService } from '../Services/add-patient.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-symptommanage',
  templateUrl: './symptommanage.component.html',
  styleUrls: ['./symptommanage.component.css']
})
export class SymptommanageComponent implements OnInit {
  displayedColumns = ['symptom_name'];
  dataSource = new MatTableDataSource<Symptom>();
  constructor(private _liveAnnouncer: LiveAnnouncer, private router: Router, private user: AddPatientService, private authService: AuthService) { }
  @ViewChild(MatSort) sort!: MatSort;
    async ngOnInit() {
      
    (await this.authService.getSymptoms()).subscribe((x) => {
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
