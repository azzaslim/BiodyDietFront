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
      localStorage.setItem("answertoupdate",JSON.stringify(response))

      this.getInfoQuestionnaire()

    })
 }
 async getInfoQuestionnaire(){
  
   this.id= JSON.parse(localStorage.getItem('answertoupdate')!)[0]['id'],
   this.title= JSON.parse(localStorage.getItem('answertoupdate')!)[0]['name'],
   this.isPublished= JSON.parse(localStorage.getItem('answertoupdate')!)[0]['is_published'],
   this.ordering= JSON.parse(localStorage.getItem('answertoupdate')!)[0]['ordering'],
   this.createdAt= (this.datePipe.transform(JSON.parse(localStorage.getItem('answertoupdate')!)[0]['created_at'], 'dd/MM/yyyy')!)
 this.modifiedAt=this.datePipe.transform(JSON.parse(localStorage.getItem('answertoupdate')!)[0]['modified_at'], 'dd/MM/yyyy')!
   this.creatorUser= JSON.parse(localStorage.getItem('answertoupdate')!)[0]['creator_user']['email']
   if( JSON.parse(localStorage.getItem('answertoupdate')!)[0]['modifier_user'] !== null)
{   this.modifierUser= JSON.parse(localStorage.getItem('answertoupdate')!)[0]['modifier_user']['email']
} this.questionnaire=JSON.parse(localStorage.getItem('answertoupdate')!)[0]['questionnaire']['title']
  
 }
}