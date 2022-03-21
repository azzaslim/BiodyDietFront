import { Injectable } from '@angular/core';
import { ADD_PATIENT_URL } from 'src/common/url';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

export interface Profil{
  firstName: string;
  id: number;
  lastName: number;
  completed: string;
}

@Injectable({
  providedIn: 'root'
})
export class AddPatientService {
  
  URL="http://localhost:8000/get/patients";
  constructor(private http:HttpClient,private router:Router, private formBuilder : FormBuilder,) { }
  register(patient: any){
    console.log(patient);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(ADD_PATIENT_URL, patient, { headers });
    
  }
  getPatients(): Observable<Profil[]>{
    return this.http.get<Profil[]>(this.URL);
  }
}
