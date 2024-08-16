// booking.service.ts

import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from '../apiconfig';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private backendUrl = apiUrl; 

  constructor(private http: HttpClient) { }

  addBooking(booking: any): Observable<any> {
    const authToken = localStorage.getItem('token');
    console.log(authToken);
 
    // Set up headers with authorization
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${authToken}`,
    });
    return this.http.post(`${this.backendUrl}/booking/book`, booking, {headers});
  }

  getAllBookings(requestBody:any): Observable<any[]> {
    const authToken = localStorage.getItem('token');
    console.log(authToken);
 
    // Set up headers with authorization
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${authToken}`,
    });
    return this.http.post<any[]>(`${this.backendUrl}/booking/all`,requestBody, {headers});
  }


  editBooking(bookingId: string, updatedBooking: any): Observable<any> {
    const authToken = localStorage.getItem('token');
    console.log(authToken);
 
    // Set up headers with authorization
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${authToken}`,
    });
    
    return this.http.put(`${this.backendUrl}/booking/update/${bookingId}`, updatedBooking, {headers});
  }
  
  deleteBooking(bookingId: string): Observable<any> {
    const authToken = localStorage.getItem('token');
    console.log(authToken);
 
    // Set up headers with authorization
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${authToken}`,
    });
    
    return this.http.delete(`${this.backendUrl}/booking/cancel/${bookingId}`, {headers});
  }

  searchProducts(query: string): Observable<any> {
    
    return this.http.post<any>(`${this.backendUrl}/booking/all`, { "searchValue": 'ang'});
  }
 
  sortProducts(sort: string): Observable<any> {
    
    return this.http.post<any>(`${this.backendUrl}/booking/all`, { sortValue: sort });
  }
  

}
