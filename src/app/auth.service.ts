import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LOGIN_URL, REGISTER_URL, VERIF_URL,RESET_URL } from 'src/common/url';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
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



  logout() {    
    sessionStorage.setItem('isLoggedIn','false');    
    sessionStorage.clear(); 
    console.clear()
    }    
}
