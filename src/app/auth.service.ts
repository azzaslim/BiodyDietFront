import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LOGIN_URL } from 'src/common/url';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private LOGIN_URL="http://localhost:8000/api/login";
  constructor(private http:HttpClient,private router:Router, private formBuilder : FormBuilder,) { }


  login(user: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(LOGIN_URL, user, { headers });
  }
  logout() {    
    sessionStorage.setItem('isLoggedIn','false');    
    sessionStorage.clear(); 
    console.clear()
    }    
}
