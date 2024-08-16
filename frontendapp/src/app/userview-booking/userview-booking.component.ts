import { Component, OnInit } from '@angular/core';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-userview-booking',
  templateUrl: './userview-booking.component.html',
  styleUrls: ['./userview-booking.component.css']
})
export class UserviewBookingComponent implements OnInit { bookings: any[] = [];
  // bookings: any[] = []; 
  // showEditForm = false;
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
  logout(): void {
    // Perform logout logic here
    // For example, clear user authentication, navigate to the login page, etc.
    console.log('Logout clicked');
    // For demonstration purposes, let's navigate to the login page
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    window.location.href = '/login';
  }
}


