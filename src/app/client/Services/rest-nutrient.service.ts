import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GETALL_NUTRIENTS_URL, ADD_NUTRIENT_URL } from 'src/app/common/url';

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
}
