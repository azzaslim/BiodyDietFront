import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Profil, AddPatientService } from '../Services/Rest-patient.service';
import { AuthService } from '../Services/RestUser.service';
import {MatListModule} from '@angular/material/list';


@Component({
  selector: 'app-patients-dialog',
  templateUrl: './patients-dialog.component.html',
  styleUrls: ['./patients-dialog.component.css']
})
export class PatientsDialogComponent implements OnInit {
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  id!: number;
  displayedColumns = ['id', 'firstName', 'lastName', 'birthDate'];
  nom!: string;
  prenom!: string;
  BirthDate!: Date;
  height!: number;
  weight!: number;
  profil!: string;


  dataSource = new MatTableDataSource<Profil>();
  constructor(public dialogRef: MatDialogRef<PatientsDialogComponent>, private _liveAnnouncer: LiveAnnouncer,
    @Inject(MAT_DIALOG_DATA) public data: Profil, private user: AddPatientService, private authService: AuthService, private router: Router, private datePipe: DatePipe
  ) { }
  @ViewChild(MatSort) sort!: MatSort;
  async ngOnInit() {

    (await this.user.getPatients()).subscribe((x) => {
      this.dataSource = new MatTableDataSource(x);
if (x.length==0)
{
  this.onNoClick()
  alert('no patient exist')
}
    },
      err => {
        this.authService.logout(),
          console.log(err);
        //  this.failNotification();
        // this.showToasterError();

      }
    )
  }
  onNoClick(): void {
    this.dialogRef.close();

  }
  async editProfil(profil: Profil) {
    let route = 'presc';
    localStorage.setItem('profil', JSON.stringify(profil.id));

    this.router.navigate([route]);

    this.onNoClick();

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

  }
}