import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
<<<<<<< HEAD
import { ADD_PREPARATION_URL, GETALL_Product_URL, LOGIN_URL, REGISTER_URL } from 'src/common/url';
=======
<<<<<<< HEAD
import { LOGIN_URL, REGISTER_URL, VERIF_URL,RESET_URL } from 'src/common/url';
=======
import { ADD_PREPARATION_URL, LOGIN_URL, REGISTER_URL } from 'src/common/url';
>>>>>>> 2bbdad5478eeb223b9a610e99b74cc161bf148f9
>>>>>>> 95391d1050f6db818eb9b2e43caf170199e3eece

@Injectable({
  providedIn: 'root'
})
export class AuthService {
<<<<<<< HEAD
  
=======
  private LOGIN_URL="http://localhost:8000/api/login";
  private REGISTER_URL="http://localhost:8000/api/register";
  private ADD_PREPARATION_URL="http://localhost:8000/api/add/preparation";
>>>>>>> 2bbdad5478eeb223b9a610e99b74cc161bf148f9
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
 


  logout() {    
    sessionStorage.setItem('isLoggedIn','false');    
    sessionStorage.clear(); 
    console.clear()
    }    
}
