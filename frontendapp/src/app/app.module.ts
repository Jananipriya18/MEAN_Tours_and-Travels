import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { NgForm } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { AddBookingComponent } from './add-booking/add-booking.component';
import { ViewBookingComponent } from './view-booking/view-booking.component';
import { UserComponent } from './user/user.component';
import { UserviewBookingComponent } from './userview-booking/userview-booking.component';
@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LandingPageComponent,
    LoginComponent,
    AdminComponent,
    AddBookingComponent,
    ViewBookingComponent,
    UserComponent,
    UserviewBookingComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
