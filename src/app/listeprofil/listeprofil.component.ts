import { Component, OnInit } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit,ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

export interface Profil{
  nom: string;
  id: number;
  prenom: string;
  date: Date;
}

const ELEMENT_DATA: Profil[] = [
  {id: 1, nom: 'Beryllium', prenom:'ali', date: new Date(1980,7,20)},
  {id: 2, nom: 'AAAAA', prenom: 'keven', date: new Date(2019,10,2)},
  {id: 3, nom: 'Helium', prenom: 'dom', date: new Date (2022,12,1)},
  {id: 4, nom: 'Lithium', prenom:'karla', date: new Date(2000,7,21)},
 
]
@Component({
  selector: 'app-listeprofil',
  templateUrl: './listeprofil.component.html',
  styleUrls: ['./listeprofil.component.css']
})
export class ListeprofilComponent implements  AfterViewInit {
  
  displayedColumns: string[] = ['id', 'nom', 'prenom', 'date'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  Profil: Profil[]=[];
 

  constructor(private _liveAnnouncer: LiveAnnouncer,private router: Router) {}

  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {
    
    this.dataSource.sort = this.sort;
  }
  announceSortChange(sortState: Sort) {
   
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  
 
}