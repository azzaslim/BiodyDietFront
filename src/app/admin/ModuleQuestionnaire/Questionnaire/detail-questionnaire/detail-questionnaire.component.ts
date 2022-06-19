import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { RestQuestionnaireService } from 'src/app/client/Services/rest-questionnaire.service';
import { RestUserService } from 'src/app/client/Services/RestUser.service';

@Component({
  selector: 'app-detail-questionnaire',
  templateUrl: './detail-questionnaire.component.html',
  styleUrls: ['./detail-questionnaire.component.css']
})
export class DetailQuestionnaireComponent implements OnInit {
  id!: number;
  
  title!:string;
  isPublished!:boolean;
  ordering!:number;
  creatorUser!:string;
  modifierUser !:string;
   
    createdAt!:string;
    modifiedAt!:string;

 constructor(private _liveAnnouncer: LiveAnnouncer, private route: ActivatedRoute, private router: Router, private RestQuestionnaireService: RestQuestionnaireService, private datePipe :DatePipe ) {

 }

 @ViewChild(MatSort) sort!: MatSort;

 async ngOnInit() {
  (await this.RestQuestionnaireService.getQuestionnaire(localStorage.getItem('Questionnaire to manage'))).subscribe(
    response => {
      console.log(response)    
    localStorage.setItem("questionnairetoupdate",JSON.stringify(response))
      this.getInfoQuestionnaire()

    })
 }
 async getInfoQuestionnaire(){
  
   this.id= JSON.parse(localStorage.getItem('questionnairetoupdate')!)[0]['id'],
   this.title= JSON.parse(localStorage.getItem('questionnairetoupdate')!)[0]['title'],
   this.isPublished= JSON.parse(localStorage.getItem('questionnairetoupdate')!)[0]['is_published'],
   this.ordering= JSON.parse(localStorage.getItem('questionnairetoupdate')!)[0]['ordering'],
   this.createdAt= (this.datePipe.transform(JSON.parse(localStorage.getItem('questionnairetoupdate')!)[0]['created_at'], 'dd/MM/yyyy')!)
  this.modifiedAt=this.datePipe.transform(JSON.parse(localStorage.getItem('questionnairetoupdate')!)[0]['modified_at'], 'dd/MM/yyyy')!
   this.creatorUser= JSON.parse(localStorage.getItem('questionnairetoupdate')!)[0]['creator_user']['email'],
   this.modifierUser= JSON.parse(localStorage.getItem('questionnairetoupdate')!)[0]['modifier_user']['email']
 
  
 }

 

}