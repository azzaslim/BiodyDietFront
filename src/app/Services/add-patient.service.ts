import { Injectable } from '@angular/core';
import { ADD_PATIENT_URL } from 'src/common/url';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

export interface Profil {
  first_name: string;
  id: number;
  last_name: number;
  completed: string;
}

@Injectable({
  providedIn: 'root'
})
export class AddPatientService {

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
