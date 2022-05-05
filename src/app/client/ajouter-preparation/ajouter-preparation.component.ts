import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmedValidator } from '../Validator-Password/confirmed-validator';
import {MatTableDataSource} from '@angular/material/table';
import { RestUserService, Product } from '../Services/RestUser.service';

@Component({
  selector: 'app-ajouter-preparation',
  templateUrl: './ajouter-preparation.component.html',
  styleUrls: ['./ajouter-preparation.component.css']
})
export class AjouterPreparationComponent implements OnInit {

  displayedColumns = ['composition'];
  dataSource = new MatTableDataSource<Product>();
  
  addData : FormGroup =new FormGroup({});
  constructor(private RestUserService:RestUserService ,private router:Router, private formBuilder : FormBuilder,private user: RestUserService ) { 

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
  
  this.RestUserService.add(data)
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
