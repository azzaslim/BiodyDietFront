import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ConfirmedValidator } from '../confirmed-validator';

@Component({
  selector: 'app-ajouter-preparation',
  templateUrl: './ajouter-preparation.component.html',
  styleUrls: ['./ajouter-preparation.component.css']
})
export class AjouterPreparationComponent implements OnInit {

  data = [

    {id: 1, name: 'Rajesh', email: 'rajesh@gmail.com'},

    {id:2, name: 'Paresh', email: 'paresh@gmail.com'},

    {id:3, name: 'Naresh', email: 'naresh@gmail.com'},

    {id:4, name: 'Suresh', email: 'suresh@gmail.com'},

    {id:5, name: 'Karan', email: 'karan@gmail.com'},

    {id:6, name: 'dummy', email: 'dummy@gmail.com'},

    {id:7, name: 'dummy1', email: 'dummy@gmail.com'},

    {id:8, name: 'dummy2', email: 'dummy@gmail.com'},

    {id:9, name: 'dummy3', email: 'dummy@gmail.com'},

    {id:10, name: 'dummy4', email: 'dummy@gmail.com'},

    {id:11, name: 'dummy5', email: 'dummy@gmail.com'},

    {id:12, name: 'dummy6', email: 'dummy@gmail.com'},

    {id:13, name: 'dummy7', email: 'dummy@gmail.com'},

    {id:14, name: 'dummy8', email: 'dummy@gmail.com'},

  ];

  displayedColumns = ['id', 'name', 'email'];
  
  addData : FormGroup =new FormGroup({});
  constructor(private authService:AuthService ,private router:Router, private formBuilder : FormBuilder,  ) { 

    this.addData=formBuilder.group({
      name:['',[Validators.required]],
      portion:['',[Validators.required]],
      comment:['',[Validators.required]],
      composition:['',[Validators.required]],
    })
  }

  ngOnInit(): void {
  }
  get f() {
    return this.addData.controls;
  }
add(){
  
  let data = this.addData.value
  
  this.authService.add(data)
  .subscribe(
    response=> {
      this.router.navigate(['/'])
    },
    err => console.log(err),
  )
    }

}
