import { Component, OnInit } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';
import { RestUserService } from '../Services/RestUser.service';
import { Profil, RestPatientService } from '../Services/Rest-patient.service';
import { LoadingService } from 'src/app/loading.service';



@Component({
  selector: 'app-listeprofil',
  templateUrl: './listeprofil.component.html',
  styleUrls: ['./listeprofil.component.css']
})
export class ListeprofilComponent implements OnInit {
  id!: number;
  displayedColumns = ['id', 'first_name', 'last_name', 'birth_date'];
  role!: string;

  dataSource = new MatTableDataSource<Profil>();
  loading$ = this.loader.loading$;

  constructor(private _liveAnnouncer: LiveAnnouncer, private route: ActivatedRoute, private router: Router, private user: RestPatientService, private RestUserService: RestUserService,private loader: LoadingService) {

  }

  @ViewChild(MatSort) sort!: MatSort;

  async ngOnInit() {
    localStorage.removeItem('entrepriseCheck');
    localStorage.removeItem('villeCheck');
    localStorage.removeItem('logoCkeck');
    localStorage.removeItem('nomCheck');
    localStorage.removeItem('prescriptionCheck');
    localStorage.removeItem('logoCheck');
this.loader.show();

    (await this.user.getPatients()).subscribe((x) => {
      if (x.length==0)
      {
        alert("no patient exist");

         this.role = JSON.parse(localStorage.getItem('currentUser')!).role

          if ((this.role == 'ROLE_ADMIN')||(this.role == 'ROLE_MANAGER')) {
            this.router.navigate(['/admin/home'])
          }
          else
            this.router.navigate(['/home'])      }

      else
      this.dataSource = new MatTableDataSource(x);
      this.dataSource.sort = this.sort;
this.loader.hide()
    },
      err => {
        this.RestUserService.logout(),
          console.log(err),
          this.failNotification();
        // this.showToasterError();

      }
    )
  }
  announceSortChange(sortState: Sort) {

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  failNotification() {
    Swal.fire('votre session a expiré', 'veuillez reconnecter s\' il vous plait  !!', 'error');
  }
  async GetOnePatient(id: any) {

    (await this.user.getOnePatient(this.id))
      .subscribe(
        response => {
        },
        err => console.log(err),
      )
  }
}