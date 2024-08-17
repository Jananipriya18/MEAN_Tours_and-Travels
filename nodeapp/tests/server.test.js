const userController = require('../controllers/userController');
const User = require('../models/userModel');
const mongoose = require('mongoose');
const Booking = require('../models/bookingModel');
// const bookingController = require('../controllers/bookingController');
const {getAllBookings, bookTourPackage, updateTourPackage, cancelTourPackage} = require('../controllers/bookingController');
const { validateToken } = require('../authUtils');




describe('getUserByUsernameAndPassword', () => {

  test('getuserbyusernameandpassword_should_return_invalid_credentials_with_a_200_status_code', async () => {
    // Sample user credentials
    const userCredentials = {
      email: 'nonexistent@example.com',
      password: 'incorrect_password',
    };

    // Mock Express request and response objects
    const req = {
      body: userCredentials,
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the User.findOne method to resolve with null (user not found)
    User.findOne = jest.fn().mockResolvedValue(null);

    // Call the controller function
    await userController.getUserByUsernameAndPassword(req, res);

    // Assertions
    expect(User.findOne).toHaveBeenCalledWith(userCredentials);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid Credentials' });
  });

  test('getuserbyusernameandpassword_should_handle_errors_and_respond_with_a_500_status_code_and_an_error_message', async () => {
    // Mock an error to be thrown when calling User.findOne
    const error = new Error('Database error');

    // Sample user credentials
    const userCredentials = {
      email: 'john@example.com',
      password: 'password123',
    };

    // Mock Express request and response objects
    const req = {
      body: userCredentials,
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the User.findOne method to reject with an error
    User.findOne = jest.fn().mockRejectedValue(error);

    // Call the controller function
    await userController.getUserByUsernameAndPassword(req, res);

    // Assertions
    expect(User.findOne).toHaveBeenCalledWith(userCredentials);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
  });
});

describe('addUser', () => {

  test('adduser_should_add_user_and_respond_with_a_200_status_code_and_success_message', async () => {
    // Sample user data
    const userData = {
      username: 'john_doe',
      email: 'john@example.com',
      password: 'password123',
    };

    // Mock Express request and response objects
    const req = {
      body: userData,
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the User.create method to resolve with the sample user data
    User.create = jest.fn().mockResolvedValue(userData);

    // Call the controller function
    await userController.addUser(req, res);

    // Assertions
    expect(User.create).toHaveBeenCalledWith(userData);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Success' });
  });

  test('adduser_should_handle_errors_and_respond_with_a_500_status_code_and_an_error_message', async () => {
    // Mock an error to be thrown when calling User.create
    const error = new Error('Database error');

    // Mock Express request and response objects
    const req = {
      body: {},
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the User.create method to reject with an error
    User.create = jest.fn().mockRejectedValue(error);

    // Call the controller function
    await userController.addUser(req, res);

    // Assertions
    expect(User.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
  });
});

describe('getAllUsers', () => {
  test('getallusers_should_return_users_and_respond_with_a_200_status_code', async () => {
    // Sample user data
    const usersData = [
      {
        _id: 'user1',
        username: 'john_doe',
        email: 'john@example.com',
        password: 'hashed_password1',
      },
      {
        _id: 'user2',
        username: 'jane_doe',
        email: 'jane@example.com',
        password: 'hashed_password2',
      },
    ];

    // Mock Express request and response objects
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the User.find method to resolve with the sample user data
    User.find = jest.fn().mockResolvedValue(usersData);

    // Call the controller function
    await userController.getAllUsers(req, res);

    // Assertions
    expect(User.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({"users" : usersData});
  });

  test('getallusers_should_handle_errors_and_respond_with_a_500_status_code_and_an_error_message', async () => {
    // Mock an error to be thrown when calling User.find
    const error = new Error('Database error');

    // Mock Express request and response objects
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the User.find method to reject with an error
    User.find = jest.fn().mockRejectedValue(error);

    // Call the controller function
    await userController.getAllUsers(req, res);

    // Assertions
    expect(User.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
  });
});

describe('User Model Schema Validation', () => {
  test('should_validate_a_user_with_valid_data', async () => {
    const validUserData = {
      firstName: 'John',
      lastName: 'Doe',
      mobileNumber: '1234567890',
      email: 'john.doe@example.com',
      role: 'user',
      password: 'validpassword',
    };

    const user = new User(validUserData);

    // Validate the user data against the schema
    await expect(user.validate()).resolves.toBeUndefined();
  });

  test('should_validate_a_user_with_missing_required_fields', async () => {
    const invalidUserData = {
      // Missing required fields
    };

    const user = new User(invalidUserData);

    // Validate the user data against the schema
    await expect(user.validate()).rejects.toThrowError();
  });

  test('should_validate_a_user_with_invalid_mobile_number_format', async () => {
    const invalidUserData = {
      firstName: 'John',
      lastName: 'Doe',
      mobileNumber: 'not-a-number',
      email: 'john.doe@example.com',
      role: 'user',
      password: 'validpassword',
    };

    const user = new User(invalidUserData);

    // Validate the user data against the schema
    await expect(user.validate()).rejects.toThrowError(/is not a valid mobile number/);
  });

  test('should_validate_a_user_with_invalid_email_format', async () => {
    const invalidUserData = {
      firstName: 'John',
      lastName: 'Doe',
      mobileNumber: '1234567890',
      email: 'invalid-email',
      role: 'user',
      password: 'validpassword',
    };

    const user = new User(invalidUserData);

    // Validate the user data against the schema
    await expect(user.validate()).rejects.toThrowError(/is not a valid email address/);
  });

  test('should_validate_a_user_with_a_password_shorter_than_the_minimum_length', async () => {
    const invalidUserData = {
      firstName: 'John',
      lastName: 'Doe',
      mobileNumber: '1234567890',
      email: 'john.doe@example.com',
      role: 'user',
      password: 'short',
    };

    const user = new User(invalidUserData);

    // Validate the user data against the schema
    await expect(user.validate()).rejects.toThrowError(/is shorter than the minimum allowed length/);
  });

  test('should_validate_a_user_with_a_password_longer_than_the_maximum_length', async () => {
    const invalidUserData = {
      firstName: 'John',
      lastName: 'Doe',
      mobileNumber: '1234567890',
      email: 'john.doe@example.com',
      role: 'user',
      password: 'a'.repeat(256),
    };

    const user = new User(invalidUserData);

    // Validate the user data against the schema
    await expect(user.validate()).rejects.toThrowError(/is longer than the maximum allowed length /);
  });
});

describe('getAllBookings _controller', () => {

  test('should_get_all_bookings', async () => {
    const bookingsData = [
      {
        userName: "Farook",
        packageName: "w",
        location: "w",
        description: "asdfghj",
        date: "29-02-2000",
      },
      {
        userName: "Angel",
        packageName: "w",
        location: "w",
        description: "asdfghj",
        date: "29-02-2000",
      }
    ];
  
    const req = {
      body: {
        sortValue: 1,
        searchValue: 'Angel'
      }
    };
  
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  
    // Mock the Booking.find function to return a promise that resolves to bookingsData
    Booking.find = jest.fn().mockReturnValue({
      sort: jest.fn().mockResolvedValue(bookingsData)
    });
  
    // Call the getAllBookings function
    await getAllBookings(req, res);
  
    // Now, you can check if Booking.find is called with the correct argument
    expect(Booking.find).toHaveBeenCalledWith({ userName: new RegExp('Angel', 'i') });
    expect(Booking.find().sort).toHaveBeenCalledWith({ date: 1 });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ bookings: bookingsData });
  });
  test('should_handle_errors_and_respond_with_a_500_status_code_and_error_message_getallbookings', async () => {
    const error = new Error('Database error');
    const req = {};

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Booking.find = jest.fn().mockRejectedValue(error);
    await getAllBookings(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });
 
});

describe('bookTourPackage_Controller', () => {
  test('should_book_a_tour_package_and_respond_with_a_200_status_code_and_success_message', async () => {
    // Sample booking data to be added
    const bookingToAdd = {
      userName: 'John Doe',
      packageName: 'Amazing Tour',
      location: 'Exotic Destination',
      description: 'An incredible adventure awaits!',
      date: '2023-12-31',
    };

    // Mock the Booking.create method to resolve successfully
    Booking.create = jest.fn().mockResolvedValue(bookingToAdd);

    // Mock Express request and response objects
    const req = { body: bookingToAdd };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the controller function
    await bookTourPackage(req, res);

    // Assertions
    expect(Booking.create).toHaveBeenCalledWith(bookingToAdd);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Tour package booked successfully' });
  });

  test('should_handle_errors_and_respond_with_a_500_status_code_and_error_message_booktourpackage', async () => {
    // Sample booking data to be added
    const bookingToAdd = {
      userName: 'John Doe',
      packageName: 'Amazing Tour',
      location: 'Exotic Destination',
      description: 'An incredible adventure awaits!',
      date: '2023-12-31',
    };

    // Sample error message
    const errorMessage = 'Database error';

    // Mock the Booking.create method to reject with an error
    Booking.create = jest.fn().mockRejectedValue(new Error(errorMessage));

    // Mock Express request and response objects
    const req = { body: bookingToAdd };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the controller function
    await bookTourPackage(req, res);

    // Assertions
    expect(Booking.create).toHaveBeenCalledWith(bookingToAdd);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});

describe('updateTourPackage_Controller', () => {
  test('should_update_booking_and_respond_with_a_200_status_code_and_success_message', async () => {
    // Sample booking ID and updated booking data
    const bookingId = new mongoose.Types.ObjectId();
    const updatedBookingData = {
      userName: 'Updated User',
      packageName: 'Updated Package',
      location: 'Updated Location',
      description: 'Updated Description',
      date: '2023-12-31',
    };

    // Mock Express request and response objects
    const req = { params: { id: bookingId }, body: updatedBookingData };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the Booking.findByIdAndUpdate method to resolve with the updated booking data
    Booking.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedBookingData);

    // Call the controller function
    await updateTourPackage(req, res);

    // Assertions
    expect(Booking.findByIdAndUpdate).toHaveBeenCalledWith(bookingId, updatedBookingData, { new: true });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Booking updated successfully' });
  });

  test('should_handle_not_finding_a_booking_and_respond_with_a_404_status_code', async () => {
    // Mock Express request and response objects
    const req = { params: { id: new mongoose.Types.ObjectId() }, body: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the Booking.findByIdAndUpdate method to resolve with null (booking not found)
    Booking.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

    // Call the controller function
    await updateTourPackage(req, res);

    // Assertions
    expect(Booking.findByIdAndUpdate).toHaveBeenCalledWith(req.params.id, {}, { new: true });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Booking not found' });
  });

  test('should_handle_errors_and_respond_with_a_500_status_code_and_an_error_message_updateTourPackage', async () => {
    // Mock an error to be thrown when calling Booking.findByIdAndUpdate
    const error = new Error('Database error');

    // Mock Express request and response objects
    const req = { params: { id: new mongoose.Types.ObjectId() }, body: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the Booking.findByIdAndUpdate method to reject with an error
    Booking.findByIdAndUpdate = jest.fn().mockRejectedValue(error);

    // Call the controller function
    await updateTourPackage(req, res);

    // Assertions
    expect(Booking.findByIdAndUpdate).toHaveBeenCalledWith(req.params.id, {}, { new: true });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
  }); 
});

describe('cancelTourPackage_Controller', () => {
  test('should_cancel_booking_and_respond_with_a_200_status_code_and_success_message', async () => {
    // Sample booking ID to be canceled
    const bookingId = new mongoose.Types.ObjectId();

    // Mock Express request and response objects
    const req = { params: { id: bookingId } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the Booking.findByIdAndDelete method to resolve with the canceled booking data
    Booking.findByIdAndDelete = jest.fn().mockResolvedValue({
      _id: bookingId,
      userName: 'Canceled User',
      packageName: 'Canceled Package',
      location: 'Canceled Location',
      description: 'Canceled Description',
      date: '2023-12-31',
    });

    // Call the controller function
    await cancelTourPackage(req, res);

    // Assertions
    expect(Booking.findByIdAndDelete).toHaveBeenCalledWith(bookingId);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Booking canceled successfully' });
  });

  test('should_handle_notfinding_a_booking_and_respond_with_a_404_status_codes', async () => {
    // Mock Express request and response objects
    const req = { params: { id: new mongoose.Types.ObjectId() } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the Booking.findByIdAndDelete method to resolve with null (booking not found)
    Booking.findByIdAndDelete = jest.fn().mockResolvedValue(null);

    // Call the controller function
    await cancelTourPackage(req, res);

    // Assertions
    expect(Booking.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Booking not found' });
  });

  test('should_handle_errors_and_respond_with_a_500_status_code_and_an_error_message_cancelTourPackage', async () => {
    // Mock an error to be thrown when calling Booking.findByIdAndDelete
    const error = new Error('Database error');

    // Mock Express request and response objects
    const req = { params: { id: new mongoose.Types.ObjectId() } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the Booking.findByIdAndDelete method to reject with an error
    Booking.findByIdAndDelete = jest.fn().mockRejectedValue(error);

    // Call the controller function
    await cancelTourPackage(req, res);

    // Assertions
    expect(Booking.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
  });
});

describe('validateToken', () => {
  test('should_respond_with_401_status_and_error_message_if_invalid_token_is_provided', () => {
    // Mock the req, res, and next objects
    const req = {
      header: jest.fn().mockReturnValue('Bearer invalidToken'), // Updated to mimic a real Bearer token structure
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
 
    // Call the validateToken function
    validateToken(req, res, next);
 
    // Assertions
    expect(req.header).toHaveBeenCalledWith('Authorization');
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Authentication failed' });
  });
 
  test('should_respond_with_401_status_and_error_message_if_no_token_is_provided', () => {
    // Mock the req, res, and next objects
    const req = {
      header: jest.fn().mockReturnValue(null), // Simulates no Authorization header
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
 
    // Call the validateToken function
    validateToken(req, res, next);
 
    // Assertions
    expect(req.header).toHaveBeenCalledWith('Authorization');
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'No token provided' });
  });
});
