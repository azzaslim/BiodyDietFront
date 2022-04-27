import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { addSymptom_URL, ADD_PREPARATION_URL, GETPROFILE_URL, getSymptoms_URL, LOGIN_URL, REGISTER_URL, UPDATE_LOGO_URL, UPDATE_USER_URL, VERIF_URL} from 'src/common/url';
//import { ADD_PREPARATION_URL } from 'src/common/url';

import { async, Observable } from 'rxjs';
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

export interface Symptom {
  id: number;
  name: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder) { }
  ngOnInit(): void { }

  // private LOGIN_URL="http://localhost:8000/login";
  private REGISTER_URL = "http://localhost:8000/register";
  // private ADD_PREPARATION_URL="http://localhost:8000/api/add/preparation";

  GETPRODUCT_URL = "http://localhost:8000/getproducts";
  GETNutrient_URL = "http://localhost:8000/getnutrients";

  getToken() {
    return localStorage.getItem('jwt');

  }
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


//products



  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.GETPRODUCT_URL);
  }

  logout() {
    sessionStorage.setItem('isLoggedIn', 'false');
    localStorage.clear();
    console.clear()

//nutients
  // getNutrients(): Observable<Nutrient[]> {
  //   return this.http.get<Nutrient[]>(this.GETNutrient_URL);
  // }
//symptoms
  
  //  async getSymptoms() {
  //   const headers = new HttpHeaders({
  //     'Authorization': 'Bearer' + this.getToken(),
  //     'Content-Type': 'application/json',

  //   });
  //   console.log("method get Token",this.getToken());
  //   return await this.http.get(getSymptoms_URL, { headers}).toPromise();
  //  }
 

   // localStorage.removeItem('previewUrl')
   localStorage.removeItem('profil')
   localStorage.removeItem('jwt')
  }

  /* getNutrients(): Observable<Nutrient[]> {
    return this.http.get<Nutrient[]>(this.GETNutrient_URL);
  } */

  async updateLogo( logo: any) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(),

    });
    
    return await this.http.post<any>(UPDATE_LOGO_URL,logo, { headers});   
   } 

   async getSymptoms(): Promise<Observable<Symptom[]>> {
    // return this.http.get<Profil[]>(this.URL);
    console.log(this.getToken());
    let headers = new HttpHeaders().set(
      'Authorization', `Bearer ${this.getToken()} `,
    )
    return await this.http.get<Symptom[]>(getSymptoms_URL,{headers}); 
   }
   async addsymptom(symptom: any) {
    let headers = new HttpHeaders().set(
      'Authorization', `Bearer ${this.getToken()} `,
    )
    console.log(this.getToken());
    
    return await this.http.post<any>(addSymptom_URL, symptom, { headers });

  }

  }

