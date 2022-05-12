import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { getSymptoms_URL, addSymptom_URL } from 'src/app/common/url';

export interface Symptom {
  id: number;
  name: string;
}
@Injectable({
  providedIn: 'root'
})
export class RestSymptomService {

  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder) { }
  //get Token
  getToken() {
    return localStorage.getItem('jwt');

  }

 //getSymptom
  async getSymptoms(): Promise<Observable<Symptom[]>> {
    // return this.http.get<Profil[]>(this.URL);
    console.log(this.getToken());
    let headers = new HttpHeaders().set(
      'Authorization', `Bearer ${this.getToken()} `,
    )
    return await this.http.get<Symptom[]>(getSymptoms_URL,{headers}); 
   }

   //addSymptom
   async addsymptom(symptom: any) {
    let headers = new HttpHeaders().set(
      'Authorization', `Bearer ${this.getToken()} `,
    )
    console.log(this.getToken());
    
    return await this.http.post<any>(addSymptom_URL, symptom, { headers });

  }
}
