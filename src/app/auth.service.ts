import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LOGIN_URL } from 'src/common/url';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private LOGIN_URL="http://localhost:8000/api/login";
  constructor(private http:HttpClient) { }


  login(user: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    

    });
    return this.http.post<any>(LOGIN_URL, user, { headers });
  }
}
