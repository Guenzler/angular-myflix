// src/app/user-registration-form/user-registration-form.component.ts

import { Component, OnInit, Input } from '@angular/core';

// this import is used to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

/**
* The UserLoginFormComponent is used for user login
*/
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})
export class UserLoginFormComponent implements OnInit {

  /**
  * The user's login data.
  */
  @Input() userData = { username: '', password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
  * Logs a user in by making a fetch call to the API
  * save token and user to localStorage if login was successful
  * then redirects to route movies
  */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('token', result.token);
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open('User Login successful', 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies']);
    }, (error) => {
      // Extract the error message if it exists, otherwise use a default message
      const errorMessage = error?.message || 'An unknown error occurred. Please try again.';
      console.error('Login error:', error); // Log error for debugging
      this.snackBar.open(errorMessage, 'OK', { duration: 4000 });
    });
  }
}

