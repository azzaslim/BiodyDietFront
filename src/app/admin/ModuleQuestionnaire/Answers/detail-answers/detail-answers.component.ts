import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { RestResponseService } from 'src/app/client/Services/rest-response.service';

@Component({
  selector: 'app-detail-answers',
  templateUrl: './detail-answers.component.html',
  styleUrls: ['./detail-answers.component.css']
})
export class DetailAnswersComponent implements OnInit {
  id!: number;
  
  title!:string;
  isPublished!:boolean;
  ordering!:number;
  creatorUser!:string;
  modifierUser !:string;
   questionnaire!:string;
    createdAt!:string;
    modifiedAt!:string;

 constructor(private _liveAnnouncer: LiveAnnouncer, private route: ActivatedRoute, private router: Router, private RestResponseService: RestResponseService, private datePipe :DatePipe ) {

 }

 @ViewChild(MatSort) sort!: MatSort;

 async ngOnInit() {
  (await this.RestResponseService.getAnswer(localStorage.getItem('answer to manage'))).subscribe(
    response => {
      this.getInfoQuestionnaire()

    })
 }
 async getInfoQuestionnaire(){
  
   this.id= JSON.parse(localStorage.getItem('answertoupdate')!)['id'],
   this.title= JSON.parse(localStorage.getItem('answertoupdate')!)['name'],
   this.isPublished= JSON.parse(localStorage.getItem('answertoupdate')!)['isPublished'],
   this.ordering= JSON.parse(localStorage.getItem('answertoupdate')!)['ordering'],
   this.createdAt= (this.datePipe.transform(JSON.parse(localStorage.getItem('answertoupdate')!)['createdAt'], 'dd/MM/yyyy')!)
   //this.modifiedAt=this.datePipe.transform(JSON.parse(localStorage.getItem('questionnairetoupdate')!)['modifiedAt']['timestamp']* 1000.05, 'dd/MM/yyyy')!
   this.creatorUser= JSON.parse(localStorage.getItem('answertoupdate')!)['creatorUser']['email'],
   this.modifierUser= JSON.parse(localStorage.getItem('answertoupdate')!)['modifierUser']
 this.questionnaire=JSON.parse(localStorage.getItem('answertoupdate')!)['questionnaire']['title']
  
 }
}