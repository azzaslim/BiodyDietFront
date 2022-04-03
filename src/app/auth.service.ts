import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { GETPROFILE_URL, LOGIN_URL, REGISTER_URL, VERIF_URL } from 'src/common/url';
import { environment } from "src/environments/environment";

import { ADD_PREPARATION_URL } from 'src/common/url';


@Injectable({
  providedIn: 'root'
})
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


  logout() {
    sessionStorage.setItem('isLoggedIn', 'false');
    sessionStorage.clear();
    console.clear()
  }
}
