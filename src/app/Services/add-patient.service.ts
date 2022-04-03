import { Injectable } from '@angular/core';
import { ADD_PATIENT_URL } from 'src/common/url';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

<<<<<<< HEAD
export interface Profil {
  first_name: string;
=======
export interface Profil{
  firstName: string;
>>>>>>> 04eed1fc2cd7d18d83ffd994bfdf907b7eb007f3
  id: number;
  lastName: number;
  completed: string;
}

@Injectable({
  providedIn: 'root'
})
export class AddPatientService {
<<<<<<< HEAD

  URL = "http://localhost:8000/api/get/patients";
  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder) { }

  async register(patient: any) {
    console.log(this.getToken());
    let headers = new HttpHeaders().set(
      'Authorization', `Bearer ${this.getToken()} `,
    )
    return await this.http.post(ADD_PATIENT_URL,patient, { headers});   

  }
  getToken() {
    return localStorage.getItem('jwt');
=======
  
  URL="http://localhost:8000/get/patients";
  constructor(private http:HttpClient,private router:Router, private formBuilder : FormBuilder,) { }
  register(patient: any){
    console.log(patient);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(ADD_PATIENT_URL, patient, { headers });
    
>>>>>>> 04eed1fc2cd7d18d83ffd994bfdf907b7eb007f3
  }
  async getPatients(): Promise<Observable<Profil[]>> {
   // return this.http.get<Profil[]>(this.URL);
   console.log(this.getToken());
   let headers = new HttpHeaders().set(
     'Authorization', `Bearer ${this.getToken()} `,
   )
   return await this.http.get<Profil[]>(this.URL,{headers}); 
  }
}
