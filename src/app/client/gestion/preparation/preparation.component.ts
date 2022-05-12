import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import { Product, RestProductService } from '../../Services/rest-product.service';



@Component({
  selector: 'app-preparation',
  templateUrl: './preparation.component.html',
  styleUrls: ['./preparation.component.css']
})
export class PreparationComponent implements OnInit {
  displayedColumns = ['name'];
  dataSource = new MatTableDataSource<Product>();
 
  //dataSource1 = new MatTableDataSource<Nutrient>();
  constructor(private RestProductService:RestProductService ,private router:Router, private formBuilder : FormBuilder) { }
  
  ngOnInit(): void {
    this.RestProductService.getProducts().subscribe((x) =>{
      this.dataSource =new MatTableDataSource(x);
      console.log(x);
  });
  }
  search(id :string){
 console.log(id);
  }
  
  
}
