import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { RestSymptomService } from 'src/app/client/Services/rest-symptom.service';

@Component({
  selector: 'app-symptom-details',
  templateUrl: './symptom-details.component.html',
  styleUrls: ['./symptom-details.component.css']
})
export class SymptomDetailsComponent implements OnInit {
  id!: number;
  
  symptom_name!:string;
    createdAt!:string;
    modifiedAt!:string;

 constructor(private _liveAnnouncer: LiveAnnouncer, private route: ActivatedRoute, private router: Router, private RestSymptomService: RestSymptomService, private datePipe :DatePipe ) {

 }

 @ViewChild(MatSort) sort!: MatSort;

  async ngOnInit() {
   (await this.RestSymptomService.getOneSymptom(JSON.parse(localStorage.getItem('symptom to manage')!))).subscribe(
     response => {
       console.log(response)    
       console.log(JSON.parse(localStorage.getItem('symptomtoupdate')!)['symptom_name'])
           //.localStorage.setItem("symptomtoupdate",JSON.stringify(response))
           this.getInfoSymptom()

     })
 }
 async getInfoSymptom(){
   this.symptom_name= JSON.parse(localStorage.getItem('symptomtoupdate')!)['symptom_name'],
   this.createdAt= this.datePipe.transform(JSON.parse(localStorage.getItem('symptomtoupdate')!)['created_at'], 'dd/MM/yyyy')!
   this.modifiedAt=this.datePipe.transform(JSON.parse(localStorage.getItem('symptomtoupdate')!)['modified_at'], 'dd/MM/yyyy')!
 }


}
