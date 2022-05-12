import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ADD_QUESTIONNAIRE_URL, GET_QUESTIONNAIRE_URL, DELETE_QUESTIONNAIRE_URL, GET_ONE_QUESTIONNAIRE_URL, UPDATE_QUESTIONNAIRE_URL, ADD_ANSWER_URL, DELETE_ANSWER_URL, GET_ANSWERS_URL, GET_ONE_ANSWER_URL, UPDATE_ANSWER_URL } from 'src/app/common/url';
import { Questionnaire } from './rest-questionnaire.service';
export interface Answer {
  id: number;
  title: string;
  order: number;
  isPublished: boolean;
  indication:boolean;
}
@Injectable({
  providedIn: 'root'
})
export class RestResponseService {

  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder) { }
  getToken() {
    return localStorage.getItem('jwt');
  }
  async AddAnswers(answers: any) {
    console.log(this.getToken());
    let headers = new HttpHeaders().set(
      'Authorization', `Bearer ${this.getToken()} `,
    )
    console.log(answers);
    return await this.http.post(ADD_ANSWER_URL, answers, { headers });

  }
  async getAnswers(): Promise<Observable<Answer[]>> {
    let headers = new HttpHeaders().set(
      'Authorization', `Bearer ${this.getToken()} `,
    )
    return await this.http.get<Answer[]>(GET_ANSWERS_URL, { headers });
  }
  async deleteAnswer(id: any) {
    let headers = new HttpHeaders().set(
      'Authorization', `Bearer ${this.getToken()} `,
    )
    const params = new HttpParams().set('id', JSON.parse(localStorage.getItem('Answer to manage')!))

    return await this.http.delete<any>(DELETE_ANSWER_URL+"/"+ params, { headers });
  }

  async getAnswer(id: any): Promise<Observable<any>> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    })
    //console.log(id)
    return this.http.post<any>(GET_ONE_ANSWER_URL, JSON.stringify({ id: JSON.parse(localStorage.getItem('Answer to manage')!) }), { headers });
  }
  async updateAnwser(answer: any) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(),
      'Content-Type': 'application/json',

    });
    const params = new HttpParams().set('Id', JSON.parse(localStorage.getItem('Answer to manage')!));
    console.log(answer)
    return await this.http.put<any>(UPDATE_ANSWER_URL + "/" + params, answer, { headers });
  }
}
