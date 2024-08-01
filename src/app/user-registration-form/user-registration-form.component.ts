// src/app/user-registration-form/user-registration-form.component.ts

import { Component, OnInit, Input } from '@angular/core';

// import is used to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

/**
* The UserRegistrationFormComponent is used for user registration.
*/
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrl: './user-registration-form.component.scss'
})
export class UserRegistrationFormComponent implements OnInit {

  /**
  * The user's registration data.
  */
  @Input() userData = { username: '', password: '', email: '', birthdate: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

   /**
   * Registers a new user by making a fetch call to the API
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open('Registration was successful, you can login now', 'OK', {
        duration: 6000
      });
    }, (error) => {
       // Extract the error message if it exists, otherwise use a default message
       const errorMessage = error?.message || 'An unknown error occurred. Please try again.';
       console.error('Registration error:', error); // Log error for debugging
       this.snackBar.open(errorMessage, 'OK', { duration: 4000 });
    });
  }
}
