import { Injectable } from '@angular/core';

import { ADD_PATIENT_URL, GETONEPATIENTEXISTANT_URL, GET_ALL_PATIENT_URL, GET_ONE_PATIENT_URL } from 'src/common/url';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';




export interface Profil {

  firstName: string;
  id: number;
  lastName: number;
}

@Injectable({
  providedIn: 'root'
})
export class RestPatientService {
  getUsers() {
    throw new Error('Method not implemented.');
  }


  URL = "http://localhost:8000/api/get/patientsByUser";
  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder) { }

  async AddPatient(patient: any): Promise<Observable<any>> {
    console.log(this.getToken());
    let headers = new HttpHeaders().set(
      'Authorization', `Bearer ${this.getToken()} `,
    )
    console.log(patient);
    return await this.http.post(ADD_PATIENT_URL,patient, { headers});   

  }
  getToken() {
    return localStorage.getItem('jwt');
  }
 
  async getPatients(): Promise<Observable<Profil[]>> {
   // return this.http.get<Profil[]>(this.URL);
   let headers = new HttpHeaders().set(
     'Authorization', `Bearer ${this.getToken()} `,
   )
   return await this.http.get<Profil[]>(this.URL,{headers}); 
  }
  async getAllPatients(): Promise<Observable<Profil[]>> {
    // return this.http.get<Profil[]>(this.URL);
    //console.log(this.getToken());
    let headers = new HttpHeaders().set(
      'Authorization', `Bearer ${this.getToken()} `,
    )
    return await this.http.get<Profil[]>(GET_ALL_PATIENT_URL,{headers}); 
   }



  
  async getOnePatient(id :number): Promise<Observable<any>> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    })
    return this.http.post<any>(GET_ONE_PATIENT_URL,JSON.stringify({id: id}),{headers}); 
   } 
   async getOnePatientExistant(first_name :string,last_name:string,birth_date:string): Promise<Observable<any>> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    })
    return this.http.post<any>(GETONEPATIENTEXISTANT_URL,JSON.stringify({first_name: first_name,lastName:last_name,birth_date:birth_date}),{headers}); 
   } 
 
   get profilExist(): boolean {
    return localStorage.getItem('profil') ? true : false;
 }

 async deleteUser(id :number): Promise<Observable<any>> {
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.getToken()}`
  })
  return this.http.post<any>(GET_ONE_PATIENT_URL,JSON.stringify({id: id}),{headers}); 
 } 

  
}
 

