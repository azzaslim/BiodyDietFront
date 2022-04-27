import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { ADD_PATIENT_URL, GET_ONE_PATIENT_URL } from 'src/common/url';




export interface Profil {

  firstName: string;
  id: number;
  lastName: number;
}

@Injectable({
  providedIn: 'root'
})
export class AddPatientService {


  URL = "http://localhost:8000/api/get/patients";
  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder) { }

  async AddPatient(patient: any) {
    console.log(this.getToken());
    let headers = new HttpHeaders().set(
      'Authorization', `Bearer ${this.getToken()} `,
    )
    return await this.http.post(ADD_PATIENT_URL,patient, { headers});   

  }
  getToken() {
    return localStorage.getItem('jwt');
  }
 
  async getPatients(): Promise<Observable<Profil[]>> {
   // return this.http.get<Profil[]>(this.URL);
   console.log(this.getToken());
   let headers = new HttpHeaders().set(
     'Authorization', `Bearer ${this.getToken()} `,
   )
   return await this.http.get<Profil[]>(this.URL,{headers}); 
  }



  
  async getOnePatient(id :number): Promise<Observable<any>> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    })
    return this.http.post<any>(GET_ONE_PATIENT_URL,JSON.stringify({id: id}),{headers}); 
   } 
  
 
   get profilExist(): boolean {
    return localStorage.getItem('profil') ? true : false;
 }


  
}
 

