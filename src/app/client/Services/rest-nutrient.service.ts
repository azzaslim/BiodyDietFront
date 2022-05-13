import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ADD_NUTRIENT_URL, DELETE_Nutrient_URL, GETALL_NUTRIENTS_URL, GET_ONE_NUTRIENT_URL, UPDATE_NUTRIENT_URL } from 'src/common/url';


export interface Nutrient{
  id: number;
  name: string;
  Tenor:number;
  Unity:string;
}
@Injectable({
  providedIn: 'root'
})
export class RestNutrientService {
  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder) { }
  //get Token
  getToken() {
    return localStorage.getItem('jwt');

  }
  get NutrientExist(): boolean {
    return localStorage.getItem('Nutrient') ? true : false;
 }

 //getNutrient
  async getNutrients(): Promise<Observable<Nutrient[]>> {
   
    console.log(this.getToken());
    let headers = new HttpHeaders().set(
      'Authorization', `Bearer ${this.getToken()} `,
    )
    return await this.http.get<Nutrient[]>(GETALL_NUTRIENTS_URL,{headers}); 
   }
   
   //addNutrient
   async addNutrient(nutrient: any) {
    let headers = new HttpHeaders().set(
      'Authorization', `Bearer ${this.getToken()} `,
    )
    console.log(this.getToken());
    
    return await this.http.post<any>(ADD_NUTRIENT_URL, nutrient, { headers });

  }
  async getOneNutrient(id :number): Promise<Observable<any>> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    })
    return this.http.post<any>(GET_ONE_NUTRIENT_URL,JSON.stringify({id: id}),{headers}); 
   } 
  /*  async deleteNutrient(id: any) {
    let headers = new HttpHeaders().set(
      'Authorization', `Bearer ${this.getToken()} `,
    )

    return await this.http.post<any>(DELETE_Nutrient_URL, JSON.stringify({id: id}), { headers });
  } */

  async deleteNutrient(nutrient: any) {
    let headers = new HttpHeaders().set(
      'Authorization', `Bearer ${this.getToken()} `,
    )
    const params = new HttpParams().set('Id',JSON.parse(localStorage.getItem('nutrient to manage')!))

    return await this.http.delete<any>(DELETE_Nutrient_URL+ "/" +params, { headers});
  }
  async getNutrient(id:any): Promise<Observable<any>> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    })

    return this.http.post<any>(GET_ONE_NUTRIENT_URL,JSON.stringify({id:JSON.parse(id)}),{headers}); 
   } 

   async updateNutrient(nutrient: any) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(),
      'Content-Type': 'application/json',
    });

console.log(nutrient)
    const params = new HttpParams().set('Id',JSON.parse(localStorage.getItem('nutrient to manage')!))

    return await this.http.put<any>(UPDATE_NUTRIENT_URL+ "/" +params,  nutrient, { headers});
  }

  }


