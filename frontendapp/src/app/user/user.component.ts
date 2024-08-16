// user.component.ts

import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userBookings: any[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserBookings().subscribe(
      (data: any[]) => {
        this.userBookings = data;
      },
      error => {
        console.error('Error fetching user bookings:', error);
      }
    );
  }
}
