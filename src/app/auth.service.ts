import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ADD_PREPARATION_URL, LOGIN_URL, REGISTER_URL } from 'src/common/url';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private LOGIN_URL="http://localhost:8000/api/login";
  private REGISTER_URL="http://localhost:8000/api/register";
  private ADD_PREPARATION_URL="http://localhost:8000/api/add/preparation";
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

  add(prep: any){
    console.log(prep);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(ADD_PREPARATION_URL, prep, { headers });
    
  }


  logout() {    
    sessionStorage.setItem('isLoggedIn','false');    
    sessionStorage.clear(); 
    console.clear()
    }    
}
