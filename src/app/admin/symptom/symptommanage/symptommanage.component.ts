
 
 import { RestSymptomService } from './../../../client/Services/rest-symptom.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSort, Sort } from '@angular/material/sort';

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Symptom } from './../../../client/Services/rest-symptom.service';
import Swal from 'sweetalert2';
import { AddsymptomComponent } from '../addsymptom/addsymptom.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RestUserService } from 'src/app/client/Services/RestUser.service';


@Component({
  selector: 'app-symptommanage',
  templateUrl: './symptommanage.component.html',
  styleUrls: ['./symptommanage.component.css']
})
export class SymptommanageComponent implements OnInit {
  displayedColumns = ['id','symptom_name','action'];
  dataSource = new MatTableDataSource<Symptom>();

  constructor(private _liveAnnouncer: LiveAnnouncer, private router: Router,private dialog: MatDialog, private user: RestSymptomService, private authService: RestUserService) { }


  @ViewChild(MatSort) sort!: MatSort;
     async ngOnInit() {
      (await this.user.getSymptoms()).subscribe((x) => {
        if (x.length==0)
        {
          alert("no symptom exist");
          this.router.navigate(['/home'])
        }
        else
      
      localStorage.setItem("nbsymptoms",x.length.toString())
      this.dataSource = new MatTableDataSource(x);
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  failNotification() {
    Swal.fire('votre session a expiré', 'veuillez reconnecter s\' il vous plait  !!', 'error');
  }
  ConfirmationNotification() {
    
Swal.fire({
  title: 'Etes-vous sur ?',
  icon: 'info',
  showDenyButton: true,
  showCancelButton: false,
  confirmButtonText: 'Supprimer',
  denyButtonText: `Annuler`,
}).then((result) => {
  if (result.isConfirmed) {
this.deletesymptom()
Swal.fire('ce symptom a été supprimé', '', 'success')
} 
})
  }
  async deletesymptom(){
    //console.log(typeof(JSON.parse(localStorage.getItem('symptom to manage')!))),
    (await this.user.deleteSymptom(JSON.parse(localStorage.getItem('symptom to manage')!)))
    .subscribe(
      async response => {
       console.log(response)
       this.router.navigate(['/admin/symptom/symptomlist'])
       this.ngOnInit()
      },
      err => {
        console.log(err)
      })
   
  }
  async symptomToManage(symptom: Symptom) {
   // console.log('symptom to manage', JSON.stringify(symptom.id));
    localStorage.setItem('symptom to manage', JSON.stringify(symptom.id));
    
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
  async openDialog(): Promise<void> {
    
    const dialogRef = this.dialog.open(AddsymptomComponent, {
      width: '50%',
      height: '55%',
      data: {},
    });
 
    
  
  }
}
