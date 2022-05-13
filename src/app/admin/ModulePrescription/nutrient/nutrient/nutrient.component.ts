import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {  RestUserService } from 'src/app/client/Services/RestUser.service';
import Swal from 'sweetalert2';

import { RestNutrientService, Nutrient  } from '../../../../client/Services/rest-nutrient.service';
import { AddNutrientComponent } from '../add-nutrient/add-nutrient.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-nutrient',
  templateUrl: './nutrient.component.html',
  styleUrls: ['./nutrient.component.css']
})
export class NutrientComponent implements OnInit {
  displayedColumns = ['id','name','tenor','unity','action'];
  actions!: string ;
  dataSource = new MatTableDataSource<Nutrient>();
  constructor(private _liveAnnouncer: LiveAnnouncer, private router: Router, private nutrient: RestNutrientService, private restnutrient: RestNutrientService,private dialog: MatDialog, private authservice: RestUserService) { }
  @ViewChild(MatSort) sort!: MatSort;
      async ngOnInit() {
      (await this.nutrient.getNutrients()).subscribe((x) => {
        if (x.length==0)
        {
          alert("no  exist");
          this.router.navigate(['/admin/home'])
        }
        else
      localStorage.setItem("nbnutrients",x.length.toString())
      this.dataSource = new MatTableDataSource(x);
      this.dataSource.sort = this.sort;
    },
      err => {
        this.authservice.logout(),
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
this.deletenutrient()
Swal.fire('ce nutiment a été supprimé', '', 'success')
} 
})
  }
  async deletenutrient(){
    console.log(typeof(JSON.parse(localStorage.getItem('nutrient to manage')!))),
    (await this.restnutrient.deleteNutrient(JSON.parse(localStorage.getItem('nutrient to manage')!)))
    .subscribe(
      async response => {
       console.log(response)
       this.router.navigate(['/admin/nutrient/nutrientlist'])
       this.ngOnInit()
      },
      err => {
        console.log(err)
      })
   
  }
  async nutrientToManage(nutrient: Nutrient) {
    localStorage.setItem('nutrient to manage', JSON.stringify(nutrient.id));
    localStorage.setItem('nutrienttoupdate', JSON.stringify(nutrient));
  }
  async openDialog(): Promise<void> {
    
        const dialogRef = this.dialog.open(AddNutrientComponent, {
          width: '50%',
          height: '55%',
          data: {},
        });
     
        
      
      }
    
  
 

}
