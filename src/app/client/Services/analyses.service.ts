import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ADD_PRESCRIPTION_URL, GET_PRESCRIPTION_URL } from 'src/common/url';

@Injectable({
  providedIn: 'root'
})
export class AnalysesService {

  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder) { }
  getToken() {
    return localStorage.getItem("jwt");
  }
 

     async GetPrescription(Presc :any):Promise<Observable<any>>
     {
      let headers = new HttpHeaders().set(
        'Authorization', `Bearer ${this.getToken()} `,
      )
      return await this.http.post(GET_PRESCRIPTION_URL,JSON.stringify({id: Presc}), { headers});   
     }
}
