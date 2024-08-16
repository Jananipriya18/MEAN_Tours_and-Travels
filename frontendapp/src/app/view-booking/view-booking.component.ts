// view-booking.component.ts

import { Component, OnInit } from '@angular/core';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.css']
})
export class ViewBookingComponent implements OnInit {
  bookings: any[] = [];
  showEditForm = false;
  updatedBooking: any = {}; // Add this line
  products: any[] = [];
  allProducts: any[] = []; // Declare the allProducts variable
  userRole: string | null = null;
allusers: any[] = [];
requestBody: any = {}
searchValue: string = ''; // Declare the searchText property
sort: string = ''; // Declare the sortValue property
  constructor(private bookingService: BookingService) {
    console.log('ViewBookingComponent created');
  }

  ngOnInit() {
    this.getAllBookings();
  }

  getAllBookings() {
    let requestBody = { 
      searchValue: this.searchValue,
      sortValue: this.sort
    }
    this.bookingService.getAllBookings(requestBody).subscribe(
      (data: any) => {
        this.bookings = data.bookings;
        console.log('Bookings fetched successfully', data);
      },
      (error) => {
        console.error('Error fetching bookings', error);
      }
    );
  }

  openEditForm(booking: any) {
    this.updatedBooking = { ...booking };
    this.showEditForm = true;
  }

  editBooking() {
    // Call your service method to save the changes
    this.bookingService.editBooking(this.updatedBooking._id, this.updatedBooking).subscribe(
      (data) => {
        console.log('Booking updated successfully', data);
        this.showEditForm = false; // Close the edit form
        this.getAllBookings(); // Refresh the list after editing
      },
      (error) => {
        console.error('Error updating booking', error);
      }
    );
  }

  deleteBooking(bookings_id: string) {
    this.bookingService.deleteBooking(bookings_id).subscribe(
      (data) => {
        console.log('Booking deleted successfully', data);
        this.getAllBookings(); // Refresh the list after deleting
      },
      (error) => {
        console.error('Error deleting booking', error);
      }
    );
  }

  searchName: string = ''; // Declare the searchText property
 
  searchProducts() {
    if (this.searchName) {
      this.bookingService.searchProducts(this.searchName).subscribe(
        data => {
          this.products = data;
          console.log('Products fetched successfully', data);
          // Manipulate the arrays and check with userId
          this.products = this.products.map(product => {
            const matchingUser = this.allusers.find(user => user._id === product.userId);
            if (matchingUser) {
              product.authorInfo = {
                _id: matchingUser._id,
                firstName: matchingUser.firstName,
                lastName: matchingUser.lastName,
                // Add other user properties as needed
              };
            }
            return product;
          });
 
        },
        error => {
          console.error('Error:', error);
        }
      );
    } else {
      this.products = [...this.allProducts]; // Display all products when search input is cleared
    }
  }
 
  sortValue: string = ''; // Declare the sortValue property
 
  sortProducts() {
    this.bookingService.sortProducts(this.sortValue).subscribe(
      data => {
        this.products = data;
              // Manipulate the arrays and check with userId
              this.products = this.products.map(product => {
                const matchingUser = this.allusers.find(user => user._id === product.userId);
                if (matchingUser) {
                  product.authorInfo = {
                    _id: matchingUser._id,
                    firstName: matchingUser.firstName,
                    lastName: matchingUser.lastName,
                    // Add other user properties as needed
                  };
                }
                return product;
              });
            },
      error => {
        console.error('Error:', error);
      }
    );
  }
}
