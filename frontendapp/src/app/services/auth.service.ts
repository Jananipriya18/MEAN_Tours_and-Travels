// user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from '../apiconfig';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = apiUrl;

  constructor(private http: HttpClient) {}

  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/signup`, user);
  }

  loginUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/login`, user);
  }
}
