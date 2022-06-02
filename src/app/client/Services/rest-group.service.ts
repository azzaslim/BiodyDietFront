import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ADD_USER_GROUP_URL, DELETE_GROUP_URL, GET_ALL_GROUPS_URL, GET_ONE_GROUP_URL, UPDATE_GROUP_URL } from 'src/app/common/url';
import { Observable } from 'rxjs';

export interface Group{
  id: number;
  group_name: string;
}

@Injectable({
  providedIn: 'root'
})
export class RestGroupService {

  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder) { }
  //get Token
  getToken() {
    return localStorage.getItem('jwt');

  }
  get GroupExist(): boolean {
    return localStorage.getItem('Group') ? true : false;
 }

 //getGroup
  async getGroups(): Promise<Observable<Group[]>> {
   
    console.log(this.getToken());
    let headers = new HttpHeaders().set(
      'Authorization', `Bearer ${this.getToken()} `,
    )
    return await this.http.get<Group[]>(GET_ALL_GROUPS_URL,{headers}); 
   }
   
   //addGroup
   async addGroup(group: any) {
    let headers = new HttpHeaders().set(
      'Authorization', `Bearer ${this.getToken()} `,
    )
    console.log(this.getToken());
    
    return await this.http.post<any>(ADD_USER_GROUP_URL, group, { headers });

  }
  async getOneGroup(id :number): Promise<Observable<any>> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    })
    return this.http.post<any>(GET_ONE_GROUP_URL,JSON.stringify({id: id}),{headers}); 
   } 
 

  async deleteGroup(group: any) {
    let headers = new HttpHeaders().set(
      'Authorization', `Bearer ${this.getToken()} `,
    )
    const params = new HttpParams().set('Id',JSON.parse(localStorage.getItem('group to manage')!))

    return await this.http.delete<any>(DELETE_GROUP_URL+ "/" +params, { headers});
  }
  

   async updateGroup(group: any) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(),
      'Content-Type': 'application/json',
    });

console.log(group)
    const params = new HttpParams().set('Id',JSON.parse(localStorage.getItem('group to manage')!))

    return await this.http.put<any>(UPDATE_GROUP_URL+ "/" +params,  group, { headers});
  }

}
