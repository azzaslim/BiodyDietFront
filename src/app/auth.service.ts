import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { addSymptom_URL, ADD_PREPARATION_URL, GETPROFILE_URL, getSymptoms_URL, LOGIN_URL, REGISTER_URL, VERIF_URL } from 'src/common/url';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


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

//add preparation
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

//products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.GETPRODUCT_URL);
  }

  logout() {
    sessionStorage.setItem('isLoggedIn', 'false');
    sessionStorage.clear();
    console.clear()
  }
//nutients
  getNutrients(): Observable<Nutrient[]> {
    return this.http.get<Nutrient[]>(this.GETNutrient_URL);
  }
//symptoms
 /* async addsymptom(symptom: any) {
    let headers = new HttpHeaders().set(
      'Authorization', `Bearer ${this.getToken()} `,
    )
    console.log(this.getToken());
    
    return await this.http.post<any>(addSymptom_URL, symptom, { headers });

  } */
  //  async getSymptoms() {
  //   const headers = new HttpHeaders({
  //     'Authorization': 'Bearer' + this.getToken(),
  //     'Content-Type': 'application/json',

  //   });
  //   console.log("method get Token",this.getToken());
  //   return await this.http.get(getSymptoms_URL, { headers}).toPromise();
  //  }
  /* async getSymptoms(): Promise<Observable<Symptom[]>> {
    // return this.http.get<Profil[]>(this.URL);
    console.log(this.getToken());
    let headers = new HttpHeaders().set(
      'Authorization', `Bearer ${this.getToken()} `,
    )
    return await this.http.get<Symptom[]>(getSymptoms_URL,{headers}); 
   } */
}
