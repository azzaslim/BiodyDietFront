import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GETALL_PRODUCTS_URL, ADD_PRODUCT_URL, GET_ONE_PRODUCT_URL, DELETE_PRODUCT_URL, UPDATE_PRODUCT_URL } from 'src/app/common/url';



export interface Product {
  id: number;
  name: string;
  composition: string;
  portion: string;
}
@Injectable({
  providedIn: 'root'
})
export class RestProductService {
  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder) { }
  //get Token
  getToken() {
    return localStorage.getItem('jwt');

  }
  get ProductExist(): boolean {
    return localStorage.getItem('Product') ? true : false;
 }

 //getProduct
  async getProducts(): Promise<Observable<Product[]>> {
   
    console.log(this.getToken());
    let headers = new HttpHeaders().set(
      'Authorization', `Bearer ${this.getToken()} `,
    )
    return await this.http.get<Product[]>(GETALL_PRODUCTS_URL,{headers}); 
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
   async deleteProduct(id: any) {
    let headers = new HttpHeaders().set(
      'Authorization', `Bearer ${this.getToken()} `,
    )

    return await this.http.post<any>(DELETE_PRODUCT_URL, JSON.stringify({id: id}), { headers });
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
