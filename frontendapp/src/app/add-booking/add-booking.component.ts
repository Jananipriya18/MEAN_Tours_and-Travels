// add-booking.component.ts

import { Component } from '@angular/core';
import { BookingService } from '../services/booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css']
})
export class AddBookingComponent {
  booking = {
    userName: '',
    packageName: '',
    location: '',
    description: '',
    date: ''
  };

  constructor(private bookingService: BookingService, private router: Router) { }

  addBooking() {
    this.bookingService.addBooking(this.booking).subscribe(
      response => {
        console.log('Booking added successfully:', response);

        // Navigate to view-booking component after successfully adding a booking
        this.router.navigate(['/admin-dashboard/view-booking']);
      },
      error => {
        console.error('Error adding booking:', error);
      }
    );
  }
  
}
