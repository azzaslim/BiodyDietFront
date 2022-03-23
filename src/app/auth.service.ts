import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
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


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private LOGIN_URL="http://localhost:8000/login";
   private REGISTER_URL="http://localhost:8000/register";
  // private ADD_PREPARATION_URL="http://localhost:8000/api/add/preparation";
   GETPRODUCT_URL="http://localhost:8000/getproducts";
   GETNutrient_URL="http://localhost:8000/getnutrients";
  constructor(private http:HttpClient,private router:Router, private formBuilder : FormBuilder,) { }


  login(user: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(LOGIN_URL, user, { headers });
  }


  register(user: any){
    console.log(user);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(REGISTER_URL, user, { headers });
    
  }
  verif_email(user: any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(VERIF_URL, user, { headers });
    
  }
  change_password(user: any){
    console.log(user);
    console.log("changing password !!!!!!")
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(RESET_URL, user, { headers });
    
  }


  add(prep: any){
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
    sessionStorage.setItem('isLoggedIn','false');    
    sessionStorage.clear(); 
    console.clear()
    }   
    getNutrients(): Observable<Nutrient[]>{
      return this.http.get<Nutrient[]>(this. GETNutrient_URL);
    } 
}
