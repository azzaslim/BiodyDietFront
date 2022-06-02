import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { RestNutrientService } from 'src/app/client/Services/rest-nutrient.service';

@Component({
  selector: 'app-nutrientdetails',
  templateUrl: './nutrientdetails.component.html',
  styleUrls: ['./nutrientdetails.component.css']
})
export class NutrientdetailsComponent implements OnInit {

  id!: number;
  
  name!:string;
  tenor!:string;
  unity!:string;
    createdAt!:string;
    modifiedAt!:string;

 constructor(private _liveAnnouncer: LiveAnnouncer, private route: ActivatedRoute, private router: Router, private RestNutrientService: RestNutrientService, private datePipe :DatePipe ) {

 }

 @ViewChild(MatSort) sort!: MatSort;

  async ngOnInit() {
   (await this.RestNutrientService.getOneNutrient(JSON.parse(localStorage.getItem('nutrient to manage')!))).subscribe(
     response => {
       console.log(response)    
           this.getInfoNutrient()

     })
 }
 async getInfoNutrient(){
   this.name= JSON.parse(localStorage.getItem('nutrienttoupdate')!)['name'],
   this.tenor= JSON.parse(localStorage.getItem('nutrienttoupdate')!)['tenor'],
   this.unity= JSON.parse(localStorage.getItem('nutrienttoupdate')!)['unity'],
   this.createdAt= this.datePipe.transform(JSON.parse(localStorage.getItem('nutrienttoupdate')!)['created_at'], 'dd/MM/yyyy')!
   this.modifiedAt=this.datePipe.transform(JSON.parse(localStorage.getItem('nutrienttoupdate')!)['modifiedAt'], 'dd/MM/yyyy')!
 }


}
