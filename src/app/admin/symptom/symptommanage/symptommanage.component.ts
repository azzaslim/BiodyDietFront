
/* import { Symptom } from './../../../client/Services/RestUser.service';
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';

import { MatSort, Sort } from '@angular/material/sort';

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { RestUserService } from 'src/app/client/Services/RestUser.service';
import { Symptom } from './../../../client/Services/rest-symptom.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-symptommanage',
  templateUrl: './symptommanage.component.html',
  styleUrls: ['./symptommanage.component.css']
})
export class SymptommanageComponent implements OnInit {
  displayedColumns = ['id','symptom_name'];
  dataSource = new MatTableDataSource<Symptom>();
  constructor(private _liveAnnouncer: LiveAnnouncer, private router: Router, private user: RestUserService, private RestUserService: RestUserService) { }
  @ViewChild(MatSort) sort!: MatSort;
     async ngOnInit() {
      (await this.user.getSymptoms()).subscribe((x) => {
        if (x.length==0)
        {
          alert("no symptom exist");
          this.router.navigate(['/home'])
        }
        else
        this.dataSource = new MatTableDataSource(x);
        this.dataSource.sort = this.sort;
  
      },
        err => {
         /*  this.RestUserService.logout(),
            console.log(err),
            this.failNotification();
          */
  
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
     
        this.RestUserService.logout()
      
    })
  }
}
