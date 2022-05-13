import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { addSymptom_URL, ADD_PREPARATION_URL, DELETE_Symptom_URL, GETPROFILE_URL, getSymptoms_URL, GET_ONE_SYMPTOM_URL, LOGIN_URL, REGISTER_URL, VERIF_URL } from 'src/common/url';




export interface Symptom {
  id: number;
  symptom_name: string;
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
  async deleteSymptom(symptom: any) {
    let headers = new HttpHeaders().set(
      'Authorization', `Bearer ${this.getToken()} `,
    )
    const params = new HttpParams().set('Id',JSON.parse(localStorage.getItem('symptom to manage')!))

    return await this.http.delete<any>(DELETE_Symptom_URL+ "/" +params, { headers});
  }
  async getOneSymptom(id :number): Promise<Observable<any>> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    })
    return this.http.post<any>(GET_ONE_SYMPTOM_URL,JSON.stringify({id: id}),{headers}); 
   } 
   get SymptomExist(): boolean {
    return localStorage.getItem('symptom_name') ? true : false;
 }
}
