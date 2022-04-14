import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { GETPROFILE_URL, LOGIN_URL, REGISTER_URL, UPDATE_LOGO_URL, UPDATE_USER_URL, VERIF_URL } from 'src/app/client/common/url';
import { environment } from "src/environments/environment";
import { ADD_PREPARATION_URL } from 'src/app/client/common/url';
import { Observable } from 'rxjs';


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


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder) { }
  ngOnInit(): void { }
  private REGISTER_URL = "http://localhost:8000/register";
  GETPRODUCT_URL = "http://localhost:8000/getproducts";
  GETNutrient_URL = "http://localhost:8000/getnutrients";


  login(user: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(LOGIN_URL, user, { headers });
  }
  
  
     async getProfile() {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.getToken(),
        'Content-Type': 'application/json',
  
      });
      
      return await this.http.get(GETPROFILE_URL, { headers }).toPromise();   
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
  async updateUser( user: any) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(),
      'Content-Type': 'application/json',

    });
    
    return await this.http.put<any>(UPDATE_USER_URL,user, { headers});   
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


  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.GETPRODUCT_URL);
  }

  logout() {
    sessionStorage.setItem('isLoggedIn', 'false');
    localStorage.clear();
    console.clear()
   // localStorage.removeItem('previewUrl')
   localStorage.removeItem('profil')
   localStorage.removeItem('jwt')
  }

  getNutrients(): Observable<Nutrient[]> {
    return this.http.get<Nutrient[]>(this.GETNutrient_URL);
  }

  async updateLogo( logo: any) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(),

    });
    
    return await this.http.post<any>(UPDATE_LOGO_URL,logo, { headers});   
   } 

 

}

