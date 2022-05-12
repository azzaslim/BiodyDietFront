import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-m-questionnaire',
  templateUrl: './home-m-questionnaire.component.html',
  styleUrls: ['./home-m-questionnaire.component.css']
})
export class HomeMQuestionnaireComponent implements OnInit {
  nbresponse!:string;
  nbQuestionnaire!:string;


  constructor() { }

  ngOnInit(): void {
    this.nbresponse=localStorage.getItem('nbResponse')!
    this.nbQuestionnaire = localStorage.getItem('nbQuestionnaire')!

  }

}
