import { Component, OnInit } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit,ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AddPatientService, Profil } from '../Services/add-patient.service';


@Component({
  selector: 'app-listeprofil',
  templateUrl: './listeprofil.component.html',
  styleUrls: ['./listeprofil.component.css']
})
export class ListeprofilComponent implements  OnInit {

  displayedColumns = ['id','first_name','last_name','date_of_birth'];
  dataSource = new MatTableDataSource<Profil>();

  constructor(private _liveAnnouncer: LiveAnnouncer,private router: Router, private user: AddPatientService) {
  
  }

  @ViewChild(MatSort)sort!: MatSort;

  ngOnInit() {
    this.user.getPatients().subscribe( (x) =>{
      this.dataSource =new MatTableDataSource(x);
      console.log(x);
      this.dataSource.sort = this.sort;

    })
  };
  announceSortChange(sortState: Sort) {
   
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  
 
}