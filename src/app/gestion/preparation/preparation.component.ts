import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, Nutrient } from 'src/app/auth.service';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-preparation',
  templateUrl: './preparation.component.html',
  styleUrls: ['./preparation.component.css']
})
export class PreparationComponent implements OnInit {
  displayedColumns = ['name','tenor'];
  dataSource = new MatTableDataSource<Nutrient>();
  displayedColumns1 = ['name'];
  //dataSource1 = new MatTableDataSource<Nutrient>();
  constructor(private authService:AuthService ,private router:Router, private formBuilder : FormBuilder,private user: AuthService) { }
  
  ngOnInit(): void {
    this.user.getNutrients().subscribe((x) =>{
      this.dataSource =new MatTableDataSource(x);
      console.log(x);
  });
  }
}
