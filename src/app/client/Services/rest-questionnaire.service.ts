import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ADD_QUESTIONNAIRE_URL, DELETE_QUESTIONNAIRE_URL, GET_ONE_QUESTIONNAIRE_URL, GET_QUESTIONNAIRE_URL, UPDATE_QUESTIONNAIRE_URL } from 'src/app/common/url';
export interface Questionnaire {
  id: number;
  title: string;
  order: number;
  isPublished: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class RestQuestionnaireService {

  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder) { }
  getToken() {
    return localStorage.getItem('jwt');
  }
  async AddQuestionnaire(questionnaire: any) {
    console.log(this.getToken());
    let headers = new HttpHeaders().set(
      'Authorization', `Bearer ${this.getToken()} `,
    )
    console.log(questionnaire);
    return await this.http.post(ADD_QUESTIONNAIRE_URL, questionnaire, { headers });

  }
  async getQuestionnaires(): Promise<Observable<Questionnaire[]>> {
    let headers = new HttpHeaders().set(
      'Authorization', `Bearer ${this.getToken()} `,
    )
    return await this.http.get<Questionnaire[]>(GET_QUESTIONNAIRE_URL, { headers });
  }
  async deleteQuestionnaire(id: any) {
    let headers = new HttpHeaders().set(
      'Authorization', `Bearer ${this.getToken()} `,
    )

    return await this.http.post<any>(DELETE_QUESTIONNAIRE_URL, JSON.stringify({ id: id }), { headers });
  }

  async getQuestionnaire(id: any): Promise<Observable<any>> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    })
    return this.http.post<any>(GET_ONE_QUESTIONNAIRE_URL, JSON.stringify({ id: JSON.parse(id) }), { headers });
  }
  async updateQuestionnaire(quest: any) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(),
      'Content-Type': 'application/json',

    });
    const params = new HttpParams().set('Id', JSON.parse(localStorage.getItem('Questionnaire to manage')!))
console.log(quest)
    return await this.http.put<any>(UPDATE_QUESTIONNAIRE_URL + "/" + params, quest, { headers });
  }
}
