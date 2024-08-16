import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserviewBookingComponent } from './userview-booking.component';

describe('UserviewBookingComponent', () => {
  let component: UserviewBookingComponent;
  let fixture: ComponentFixture<UserviewBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserviewBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserviewBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
