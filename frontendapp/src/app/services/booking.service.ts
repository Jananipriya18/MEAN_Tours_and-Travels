import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from '../apiconfig';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private backendUrl = apiUrl; 

  constructor(private http: HttpClient) { }

  // Utility function to create headers with the Authorization token
  private createHeaders(): HttpHeaders {
    const authToken = localStorage.getItem('token');
    console.log('Token:', authToken);
    
    if (!authToken) {
      throw new Error('Authentication token is missing.');
    }

    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`, // Ensure Bearer is used consistently
    });
  }

  addBooking(booking: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${this.backendUrl}/booking/book`, booking, { headers });
  }

  getAllBookings(requestBody: any): Observable<any[]> {
    const headers = this.createHeaders();
    return this.http.post<any[]>(`${this.backendUrl}/booking/all`, requestBody, { headers });
  }

  editBooking(bookingId: string, updatedBooking: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.put(`${this.backendUrl}/booking/update/${bookingId}`, updatedBooking, { headers });
  }

  deleteBooking(bookingId: string): Observable<any> {
    const headers = this.createHeaders();
    return this.http.delete(`${this.backendUrl}/booking/cancel/${bookingId}`, { headers });
  }

  searchProducts(query: string): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post<any>(`${this.backendUrl}/booking/all`, { "searchValue": query }, { headers });
  }

  sortProducts(sort: string): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post<any>(`${this.backendUrl}/booking/all`, { sortValue: sort }, { headers });
  }
}
