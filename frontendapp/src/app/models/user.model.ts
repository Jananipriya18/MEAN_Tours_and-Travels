export class User {
    firstName: string;
    lastName: string;
    mobileNumber: string;
    email: string;
    role: string;
    password: string;
  
    constructor(
      firstName: string,
      lastName: string,
      mobileNumber: string,
      email: string,
      role: string,
      password: string
    ) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.mobileNumber = mobileNumber;
      this.email = email;
      this.role = role;
      this.password = password;
    }
  }
  