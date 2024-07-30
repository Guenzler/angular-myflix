// src/app/user-registration-form/user-registration-form.component.ts

import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { username: '', password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  // This is the function responsible for sending the form inputs to the backend
  loginUser(): void {
    console.log('loginUser is called');
    console.log(this.userData);
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {

      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('token', result.token);
      this.dialogRef.close(); // This will close the modal on success!
      console.log(result);
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

