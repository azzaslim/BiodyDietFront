import { RestNutrientService } from '../../../client/Services/rest-nutrient.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestUserService } from 'src/app/client/Services/RestUser.service';


@Component({
  selector: 'app-add-nutrient',
  templateUrl: './add-nutrient.component.html',
  styleUrls: ['./add-nutrient.component.css']
})
export class AddNutrientComponent implements OnInit {
  addData : FormGroup =new FormGroup({});
  constructor(private RestUserService:RestNutrientService ,private router:Router, private formBuilder : FormBuilder,private user: RestUserService ) { 

    this.addData=formBuilder.group({
      name:['',[Validators.required]],
      tenor:['',[Validators.required]],
      unity:['',[Validators.required]],
    })
  }

  
  get f() {
    return this.addData.controls;
  }
   async add(){
    let data = this.addData.value;
    
    (await this.RestUserService.addNutrient(data))
    .subscribe(
      response=> {
        this.router.navigate(['/nutrient'])
      },
      err => console.log(err),
    )
      }


  ngOnInit(): void {
  }

}
