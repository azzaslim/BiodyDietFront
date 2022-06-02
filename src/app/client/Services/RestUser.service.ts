import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoadingService } from 'src/app/loading.service';
 import { DELETE_USER_URL,  GET_ONE_USER_URL, GET_USERS_URL,UPDATE_CURRENT_USER_URL } from 'src/common/url';
/*import { environment } from "src/environments/environment";
import { ADD_PREPARATION_URL } from 'src/app/common/url';
import { BehaviorSubject, Observable } from 'rxjs';
import { ADD_USER_URL, UPDATE_CURRENT_USER_URL } from 'src/common/url'; */







import { addSymptom_URL, ADD_PREPARATION_URL, ADD_USER_URL, GETPROFILE_URL, getSymptoms_URL, LOGIN_URL, REGISTER_URL, UPDATE_LOGO_URL, UPDATE_USER_URL, VERIF_URL} from 'src/common/url';
//import { ADD_PREPARATION_URL } from 'src/common/url';

import { environment } from 'src/environments/environment';





export interface Nutrient {
  id: number;
  name: string;
  tenor: string;
  unity: string;
}
export interface User {
  firstName: string;
  id: number;
  lastName: number;
  modulePresc:boolean;
}



@Injectable({
  providedIn: 'root'
})
export class RestUserService implements OnInit {
  add(data: any) {
    throw new Error('Method not implemented.');
  }
  
  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder,private loader:LoadingService) { }
  ngOnInit(): void { }

  // private LOGIN_URL="http://localhost:8000/login";
  private REGISTER_URL = "http://localhost:8000/register";
  // private ADD_PREPARATION_URL="http://localhost:8000/api/add/preparation";

  GETNutrient_URL = "http://localhost:8000/getnutrients";
  loggedIn!: number;
  private subject = new BehaviorSubject<User>(null!);
  User = new BehaviorSubject<any>(null);

  login(user: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.loggedIn = 1;
    this.User.next(user);


    this.isLoggedIn();
    return this.http.post<any>(LOGIN_URL, user, { headers });
  }

  isLoggedIn(): Boolean {
    if (this.loggedIn !== 1) return false
    else
      return true
  }

  async getProfile() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(),
      'Content-Type': 'application/json',

    });
    return await this.http.get(GETPROFILE_URL, { headers }).toPromise();
  }

  getToken() {
    return localStorage.getItem("jwt");

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

  async updateCurrentUser(user: any) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(),
      'Content-Type': 'application/json',
    });

    return await this.http.put<any>(UPDATE_CURRENT_USER_URL, user, { headers });
  }


  


 

  logout() {
    sessionStorage.setItem('isLoggedIn', 'false');
    //localStorage.clear();
    this.User.next(null!);
    //console.clear();
    this.loggedIn = 0;
    this.loader.hide()



    console.clear()
  }
//nutients
  // getNutrients(): Observable<Nutrient[]> {
  //   return this.http.get<Nutrient[]>(this.GETNutrient_URL);
  // }
//symptoms
  
  //  async getSymptoms() {
  //   const headers = new HttpHeaders({
  //     'Authorization': 'Bearer' + this.getToken(),
  //     'Content-Type': 'application/json',



   // localStorage.removeItem('previewUrl')



  /* getNutrients(): Observable<Nutrient[]> {
    return this.http.get<Nutrient[]>(this.GETNutrient_URL);
  } */

  async updateLogo(logo: any) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(),

    });

    return await this.http.post<any>(UPDATE_LOGO_URL, logo, { headers });
  }
  async getUsers(): Promise<Observable<User[]>> {
    // return this.http.get<Profil[]>(this.URL);
    let headers = new HttpHeaders().set(
      'Authorization', `Bearer ${this.getToken()} `,
    )
    return await this.http.get<User[]>(GET_USERS_URL, { headers });
  }
  public get UserSubjectValue() {
    if (this.User) {
      return this.User.value;
    } else {
      return null
    }
  }
  async deleteUser(id: any) {
    let headers = new HttpHeaders().set(
      'Authorization', `Bearer ${this.getToken()} `,
    )

    return await this.http.post<any>(DELETE_USER_URL, JSON.stringify({id: id}), { headers });
  }
  async getUser(id:any): Promise<Observable<any>> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    })

    return this.http.post<any>(GET_ONE_USER_URL,JSON.stringify({id:JSON.parse(id)}),{headers}); 
   } 
   async updateUser(user: any) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(),
      'Content-Type': 'application/json',
    });


console.log(user)

    const params = new HttpParams().set('Id',JSON.parse(localStorage.getItem('user to manage')!))

    return await this.http.put<any>(UPDATE_USER_URL+ "/" +params,  user, { headers});
  }
  AddUser(user: any) {
    console.log(user);
    let headers = new HttpHeaders().set(
      'Authorization', `Bearer ${this.getToken()} `,
    )
    return this.http.post<any>(ADD_USER_URL, user, { headers });


    }
  }


