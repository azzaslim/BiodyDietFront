import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ADD_PRESCRIPTION_URL, GETANSWERS_BYQUEST_URL, GET_ANSWERS_URL } from 'src/common/url';
export interface Answer {
  id: number;
  questionnaire: {title : string};
  QuestId: string;
  name: string;
  title:string;
  isPublished:boolean;
}
export interface questionnaire {
  id: number;
  title : string;
 
  isPublished:boolean;
}

@Injectable({
  providedIn: 'root'
})
export class RestPrescriptionService {

  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder) { }

  getToken() {
    return localStorage.getItem("jwt");
  }
  async getAnswers(): Promise<Observable<Answer[]>> {
   
  //  console.log(this.getToken());
    let headers = new HttpHeaders().set(
      'Authorization', `Bearer ${this.getToken()} `,
    )
    return await this.http.get<Answer[]>(GET_ANSWERS_URL,{headers}); 
   }
   async getAnswersByQuest(id:any): Promise<Observable<Answer[]>> {
   
    //  console.log(this.getToken());
      let headers = new HttpHeaders().set(
        'Authorization', `Bearer ${this.getToken()} `,
      )
      return await this.http.post<Answer[]>(GETANSWERS_BYQUEST_URL,JSON.stringify({id: id}),{headers}); 
     }

     async AddPrescription(Presc :any)
     {
      let headers = new HttpHeaders().set(
        'Authorization', `Bearer ${this.getToken()} `,
      )
      console.log(Presc);
      return await this.http.post(ADD_PRESCRIPTION_URL,Presc, { headers});   
     }
}
