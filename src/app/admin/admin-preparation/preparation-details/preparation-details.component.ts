import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { RestProductService } from 'src/app/client/Services/rest-product.service';

@Component({
  selector: 'app-preparation-details',
  templateUrl: './preparation-details.component.html',
  styleUrls: ['./preparation-details.component.css']
})
export class PreparationDetailsComponent implements OnInit {

  id!: number;
    comment !:string;
    symptom_name!:string;
    composition!:string;
    name!:string;
    createdAt!:string;
    modifiedAt!:string;

 constructor(private _liveAnnouncer: LiveAnnouncer, private route: ActivatedRoute, private router: Router, private RestUserService: RestProductService, private datePipe :DatePipe ) {

 }

 @ViewChild(MatSort) sort!: MatSort;

 async ngOnInit() {
   (await this.RestUserService.getOneProduct(JSON.parse(localStorage.getItem('product to manage')!))).subscribe(
     response => {
       console.log(response)    
          
           this.getInfoUser()

     })
 }
 async getInfoUser(){
  
   this.name= JSON.parse(localStorage.getItem('producttoupdate')!)['name'],
   this.comment= JSON.parse(localStorage.getItem('producttoupdate')!)['comment'],
   this.composition= JSON.parse(localStorage.getItem('producttoupdate')!)['composition'],
   this.createdAt= this.datePipe.transform(JSON.parse(localStorage.getItem('producttoupdate')!)['created_at'], 'dd/MM/yyyy')!
   this.modifiedAt=this.datePipe.transform(JSON.parse(localStorage.getItem('producttoupdate')!)['modified_at'], 'dd/MM/yyyy')!
 }
}
