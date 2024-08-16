import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AddBookingComponent } from './add-booking/add-booking.component';
import { ViewBookingComponent } from './view-booking/view-booking.component'; 
import { UserComponent } from './user/user.component';
import { UserviewBookingComponent } from './userview-booking/userview-booking.component';
const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin-dashboard', component: AdminComponent, children: [
    { path: 'add-booking', component: AddBookingComponent },
    { path: 'view-booking', component: ViewBookingComponent }
  ]},
  { path: 'user-dashboard', component: UserviewBookingComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
