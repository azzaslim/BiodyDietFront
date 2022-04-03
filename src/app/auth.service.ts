import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
<<<<<<< HEAD
import { GETPROFILE_URL, LOGIN_URL, REGISTER_URL, VERIF_URL } from 'src/common/url';
import { environment } from "src/environments/environment";

import { ADD_PREPARATION_URL } from 'src/common/url';
=======
import { Observable } from 'rxjs';

import {ADD_PREPARATION_URL, GETALL_Product_URL, LOGIN_URL, REGISTER_URL } from 'src/common/url';
import {VERIF_URL,RESET_URL } from 'src/common/url';

export interface Product{
  id: number;
  name: string;
  composition: string;
  portion: string;
}
export interface Nutrient{
  id: number;
  name: string;
  tenor: string;
  unity: string;
}
>>>>>>> 04eed1fc2cd7d18d83ffd994bfdf907b7eb007f3


@Injectable({
  providedIn: 'root'
})
<<<<<<< HEAD
export class AuthService implements OnInit {

  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder) { }
  ngOnInit(): void {}


 
login(user: any) {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  return this.http.post<any>(LOGIN_URL, user, { headers });
}


   async getProfile() {
=======
export class AuthService {

  // private LOGIN_URL="http://localhost:8000/login";
   private REGISTER_URL="http://localhost:8000/register";
  // private ADD_PREPARATION_URL="http://localhost:8000/api/add/preparation";
   GETPRODUCT_URL="http://localhost:8000/getproducts";
   GETNutrient_URL="http://localhost:8000/getnutrients";
  constructor(private http:HttpClient,private router:Router, private formBuilder : FormBuilder,) { }


  login(user: any) {
>>>>>>> 04eed1fc2cd7d18d83ffd994bfdf907b7eb007f3
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
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(environment.apiURL + 'reset/' + localStorage.getItem('token'), user, { headers });

  }


  add(prep: any) {
    console.log(prep);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(ADD_PREPARATION_URL, prep, { headers });

  }

  // GetProducts(){
    
  //   const headers = new HttpHeaders({'Content-Type': 'application/json',});
  //   return this.http.post<any>( GETALL_Product_URL,{ headers });
    
  // }
 

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this. GETPRODUCT_URL);
  }

  logout() {
    sessionStorage.setItem('isLoggedIn', 'false');
    sessionStorage.clear();
    console.clear()
<<<<<<< HEAD
  }
=======
    }   
    getNutrients(): Observable<Nutrient[]>{
      return this.http.get<Nutrient[]>(this. GETNutrient_URL);
    } 
>>>>>>> 04eed1fc2cd7d18d83ffd994bfdf907b7eb007f3
}
