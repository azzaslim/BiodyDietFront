import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GETALL_Product_URL, ADD_PREPARATION_URL, GETALL_PREPARATION_URL, GETALL_SUPPLIMENTS_URL } from 'src/app/common/url';

export interface Product {
  id: number;
  name: string;
  composition: string;
  portion: string;
  type:string;
  indication:boolean
}
@Injectable({
  providedIn: 'root'
})
export class RestProductService {

  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder) { }


  getToken() {
    return localStorage.getItem("jwt");

  } 
  getProducts(): Observable<Product[]> {
    let headers = new HttpHeaders().set(
      'Authorization', `Bearer ${this.getToken()} `,
    )
    return this.http.get<Product[]>(GETALL_Product_URL,{headers});
  }
  getPreparations(): Observable<Product[]> {
    let headers = new HttpHeaders().set(
      'Authorization', `Bearer ${this.getToken()} `,
    )
    return this.http.get<Product[]>(GETALL_PREPARATION_URL,{headers});
  }
  getSuppliments(): Observable<Product[]> {
    let headers = new HttpHeaders().set(
      'Authorization', `Bearer ${this.getToken()} `,
    )
    return this.http.get<Product[]>(GETALL_SUPPLIMENTS_URL,{headers});
  }

  addProduct(prep: any) {
    console.log(prep);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(ADD_PREPARATION_URL, prep, { headers });

  }
}
