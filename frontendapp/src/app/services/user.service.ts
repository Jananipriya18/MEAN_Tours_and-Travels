// user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from '../apiconfig';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private backendUrl = apiUrl; // Replace with your actual backend URL

  constructor(private http: HttpClient) { }

  getUserBookings(): Observable<any[]> {
    // Implement logic to get user-specific bookings
    return this.http.get<any[]>(`${this.backendUrl}/get-user-bookings`);
  }
}
