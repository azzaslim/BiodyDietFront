import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  GETALL_preparations_URL,
  GETALL_PRODUCTS_URL,
  ADD_PRODUCT_URL,
  GET_ONE_PRODUCT_URL,
  DELETE_PRODUCT_URL,
  UPDATE_PRODUCT_URL,
  GET_ONE_PREPARATION_URL,
  GETALL_SYMPTOMS_URL,
  GETALL_COMPLEMENTS_URL,
  UPDATE_PRODUCT_VISIBILITY_URL,
  ADD_SUPPLEMENT_URL,
  ADD_PREPARATION_URL,
  GETCOSMETIC_PRODUCTS_URL,
  GETADMINCOSMETIC_PRODUCTS_URL,
} from 'src/app/common/url';

import { GETALLADMIN_COMPLEMENTS_URL, GETALL_ADMINPREPARATION_URL,GETALL_PRODUCTSADMIN_URL, GETALL_PREPARATION_URL, GETALL_SUPPLIMENTS_URL } from 'src/common/url';

export interface Product {
  id: number;
  name: string;
  composition: string;
  portion: string;
  type: string;
  indication: boolean;
  comment: string;
  reponse: string;
}
@Injectable({
  providedIn: 'root',
})
export class RestProductService {
  /* getOneProduct(arg0: any) {
    throw new Error('Method not implemented.');
  } */

  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  getToken() {
    return localStorage.getItem('jwt');
  }
  getProducts(): Observable<Product[]> {
    let headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()} `
    );
    return  this.http.get<Product[]>(GETALL_PRODUCTS_URL, { headers });
  }
  getProductsAdmin(): Observable<Product[]> {
    let headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()} `
    );
    return  this.http.get<Product[]>(GETALL_PRODUCTSADMIN_URL, { headers });
  }
  getPreparations(): Observable<Product[]> {
    let headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()} `
    );
    return this.http.get<Product[]>(GETALL_PREPARATION_URL, { headers });
  }

  getAdminPreparations(): Observable<Product[]> {
    let headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()} `
    );
    return this.http.get<Product[]>(GETALL_ADMINPREPARATION_URL, { headers });
  }

  getSuppliments(): Observable<Product[]> {
    let headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()} `
    );
    return this.http.get<Product[]>(GETALL_SUPPLIMENTS_URL, { headers });
  }

 

  async getcomplements(): Promise<Observable<Product[]>> {
    console.log(this.getToken());
    let headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()} `
    );
    return await this.http.get<Product[]>(GETALL_COMPLEMENTS_URL, { headers });
  }
  async getADMINcomplements(): Promise<Observable<Product[]>> {
    console.log(this.getToken());
    let headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()} `
    );
    return await this.http.get<Product[]>(GETALLADMIN_COMPLEMENTS_URL, { headers });
  }

 
  //add Supplement
  async addSupplment(product: any) {
    let headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()} `
    );
    console.log(this.getToken());

    return await this.http.post<any>(ADD_SUPPLEMENT_URL, product, { headers });
  }
  //add preparation
  async addPreparation(product: any) {
    let headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()} `
    );
    console.log(this.getToken());

    return await this.http.post<any>(ADD_PREPARATION_URL, product, { headers });
  }

  //addProduct
  async addProduct(product: any) {
    let headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()} `
    );
    console.log(this.getToken());

    return await this.http.post<any>(ADD_PRODUCT_URL, product, { headers });
  }
  getADMINCosmeticProducts(): Observable<Product[]> {
    let headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()} `
    );
    return  this.http.get<Product[]>(GETADMINCOSMETIC_PRODUCTS_URL, { headers });
  }

  
  getCosmeticProducts(): Observable<Product[]> {
    let headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()} `
    );
    return  this.http.get<Product[]>(GETCOSMETIC_PRODUCTS_URL, { headers });
  }
  async getOneProduct(id: number): Promise<Observable<any>> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getToken()}`,
    });
    return this.http.post<any>(
      GET_ONE_PRODUCT_URL,
      JSON.stringify({ id: id }),
      { headers }
    );
  }

  async deleteProduct(product: any) {
    let headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()} `
    );
    const params = new HttpParams().set(
      'Id',
      JSON.parse(localStorage.getItem('product to manage')!)
    );

    return await this.http.delete<any>(DELETE_PRODUCT_URL + '/' + params, {
      headers,
    });
  }

  get ProductExist(): boolean {
    return localStorage.getItem('symptom_name') ? true : false;
 }

  async UpdateProductVisibility() {
    let headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()} `
    );
    const params = new HttpParams().set(
      'Id',
      JSON.parse(localStorage.getItem('product to manage')!)
    );
    //console.log(params)
    return await this.http.put<any>(
      UPDATE_PRODUCT_VISIBILITY_URL + '/' + params,
      JSON.stringify({ visibility: false }),
      { headers }
    );
  }

  async UpdateProductVisibility1() {
    let headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()} `
    );
    const params = new HttpParams().set(
      'Id',
      JSON.parse(localStorage.getItem('product to manage')!)
    );
    //console.log(params)
    return await this.http.put<any>(
      UPDATE_PRODUCT_VISIBILITY_URL + '/' + params,
      JSON.stringify({ visibility: true }),
      { headers }
    );
  }

  async getProduct(id: any): Promise<Observable<any>> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getToken()}`,
    });

    return this.http.post<any>(
      GET_ONE_PRODUCT_URL,
      JSON.stringify({ id: JSON.parse(id) }),
      { headers }
    );
  }

  async updateProduct(product: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.getToken(),
      'Content-Type': 'application/json',
    });

    const params = new HttpParams().set(
      'Id',
      JSON.parse(localStorage.getItem('product to manage')!)
    );

    return await this.http.put<any>(
      UPDATE_PRODUCT_URL + '/' + params,
      product,
      { headers }
    );
  }
}
