import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/client/Services/RestUser.service';
@Component({
  selector: 'app-addsymptom',
  templateUrl: './addsymptom.component.html',
  styleUrls: ['./addsymptom.component.css']
})
export class AddsymptomComponent implements OnInit {
  addData : FormGroup =new FormGroup({});
  constructor(private authService:AuthService ,private router:Router, private formBuilder : FormBuilder,private user: AuthService ) { 

    this.addData=formBuilder.group({
      symptom_name:['',[Validators.required]],
    })
  }

  
  get f() {
    return this.addData.controls;
  }
  async add(){
  let data = this.addData.value;
  
  (await this.authService.addsymptom(data))
  .subscribe(
    response=> {
      this.router.navigate(['/symptom'])
    },
    err => console.log(err),
  )
    }

    ngOnInit(): void {
    //   this.user.getSymptoms().subscribe((x) =>{
    //     this.dataSource =new MatTableDataSource(x);
    //     console.log(x);
    // }); 
}
}