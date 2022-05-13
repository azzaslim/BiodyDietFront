import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GETALL_preparations_URL,GETALL_PRODUCTS_URL, ADD_PRODUCT_URL, GET_ONE_PRODUCT_URL, DELETE_PRODUCT_URL, UPDATE_PRODUCT_URL, GET_ONE_PREPARATION_URL, GETALL_SYMPTOMS_URL, GETALL_COMPLEMENTS_URL, UPDATE_PRODUCT_VISIBILITY_URL } from 'src/app/common/url';
import { GETALL_PREPARATION_URL, GETALL_SUPPLIMENTS_URL } from 'src/common/url';



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
    return this.http.get<Product[]>(GETALL_PRODUCTS_URL,{headers});
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

  
  
  get ProductExist(): boolean {
    return localStorage.getItem('Product') ? true : false;
 }

 //getProduct
  async getpreparation(): Promise<Observable<Product[]>> {
   
    console.log(this.getToken());
    let headers = new HttpHeaders().set(
      'Authorization', `Bearer ${this.getToken()} `,
    )
    return await this.http.get<Product[]>(GETALL_preparations_URL,{headers}); 
   }

   async getcomplements(): Promise<Observable<Product[]>> {
   
    console.log(this.getToken());
    let headers = new HttpHeaders().set(
      'Authorization', `Bearer ${this.getToken()} `,
    )
    return await this.http.get<Product[]>(GETALL_COMPLEMENTS_URL,{headers}); 
   }
 

   
   
   //addProduct
   async addProduct(product: any) {
    let headers = new HttpHeaders().set(
      'Authorization', `Bearer ${this.getToken()} `,
    )
    console.log(this.getToken());
    
    return await this.http.post<any>(ADD_PRODUCT_URL, product, { headers });

  }
  async getOneProduct(id :number): Promise<Observable<any>> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    })
    return this.http.post<any>(GET_ONE_PRODUCT_URL,JSON.stringify({id: id}),{headers}); 
   } 
   
  async deleteProduct(symptom: any) {
    let headers = new HttpHeaders().set(
      'Authorization', `Bearer ${this.getToken()} `,
    )
    const params = new HttpParams().set('Id',JSON.parse(localStorage.getItem('product to manage')!))

    return await this.http.delete<any>(DELETE_PRODUCT_URL+ "/" +params, { headers});
  }

  
  async UpdateProductVisibility(id: any) {
    let headers = new HttpHeaders().set(
      'Authorization', `Bearer ${this.getToken()} `,
    )

    return await this.http.post<any>(UPDATE_PRODUCT_VISIBILITY_URL, JSON.stringify({id: id}), { headers });
  }

  async getProduct(id:any): Promise<Observable<any>> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    })

    return this.http.post<any>(GET_ONE_PRODUCT_URL,JSON.stringify({id:JSON.parse(id)}),{headers}); 
   } 

   async updateProduct(product: any) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(),
      'Content-Type': 'application/json',
    });

console.log(product)
    const params = new HttpParams().set('Id',JSON.parse(localStorage.getItem('product to manage')!))

    return await this.http.put<any>(UPDATE_PRODUCT_URL+ "/" +params,  product, { headers});
  }

 
  
  
}
