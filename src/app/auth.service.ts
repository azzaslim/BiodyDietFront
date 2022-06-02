import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {ADD_PREPARATION_URL, GETPROFILE_URL,  LOGIN_URL, REGISTER_URL, VERIF_URL } from 'src/common/url';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoadingService } from './loading.service';


export interface Product {
  id: number;
  name: string;
  composition: string;
  portion: string;
}
export interface Nutrient {
  id: number;
  name: string;
  tenor: string;
  unity: string;
}
// export interface Symptom {
//   id: number;
//   name: string;
// }


@Injectable({
  providedIn: 'root'
})
export class RestUserService implements OnInit {
  getUsers() {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder,private loader: LoadingService) { }
  ngOnInit(): void { }
  private REGISTER_URL = "http://localhost:8000/register";

  GETNutrient_URL = "http://localhost:8000/getnutrients";


  login(user: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(LOGIN_URL, user, { headers });

  }
  
  
     async getProfile() {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer' + this.getToken(),
        'Content-Type': 'application/json',
  
      });
      console.log("method get Token",this.getToken());
      return await this.http.get(GETPROFILE_URL, { headers}).toPromise();   
     } 

  getToken() {
    return localStorage.getItem('jwt');

  }


  register(user: any) {
    console.log(user);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(REGISTER_URL, user, { headers });

  }
  verif_email(user: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(VERIF_URL, user, { headers });

  }
  change_password(user: any) {

    const headers = new HttpHeaders({
      "Access-Control-Allow-Headers": "Content-Type",

      'Content-Type': 'application/json'
    });
    return this.http.post<any>(environment.apiURL + 'reset/' + localStorage.getItem('token'), user, { headers });

  }

//add preparation
  add(prep: any) {
    console.log(prep);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(ADD_PREPARATION_URL, prep, { headers });

  }
  logout() {
    sessionStorage.setItem('isLoggedIn', 'false');
    sessionStorage.clear();
    console.clear()
    this.loader.hide()

  }

}
