import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, Product } from '../auth.service';
import { ConfirmedValidator } from '../confirmed-validator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-ajouter-preparation',
  templateUrl: './ajouter-preparation.component.html',
  styleUrls: ['./ajouter-preparation.component.css']
})
export class AjouterPreparationComponent implements OnInit {

  displayedColumns = ['composition'];
  dataSource = new MatTableDataSource<Product>();
  
  addData : FormGroup =new FormGroup({});
  constructor(private authService:AuthService ,private router:Router, private formBuilder : FormBuilder,private user: AuthService ) { 

    this.addData=formBuilder.group({
      name:['',[Validators.required]],
      portion:['',[Validators.required]],
      comment:['',[Validators.required]],
      composition:['',[Validators.required]],
    })
  }

  
  get f() {
    return this.addData.controls;
  }
add(){
  let data = this.addData.value
  
  this.authService.add(data)
  .subscribe(
    response=> {
      this.router.navigate(['/preparations'])
    },
    err => console.log(err),
  )
    }

    ngOnInit(): void {
      this.user.getProducts().subscribe((x) =>{
        this.dataSource =new MatTableDataSource(x);
        console.log(x);
    });


   
}
}
