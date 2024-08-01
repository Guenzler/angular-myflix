import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * The DeregistrationComponent provides functionality to deregister a user account.
 * It displays a confirmation dialog for account deletion and handles the deletion process.
 */
@Component({
  selector: 'app-deregistration',
  templateUrl: './deregistration.component.html',
  styleUrl: './deregistration.component.scss'
})
export class DeregistrationComponent {

  /**
  * Creates an instance of DeregistrationComponent.
  * @param dialogRef - Reference to the dialog for controlling its open/close state.
  * @param fetchApiData - Service to fetch data from the API, including user deletion.
  * @param snackBar - Service for displaying notifications to the user.
  * @param router - Service for navigation within the application.
  */
  constructor(
    private dialogRef: MatDialogRef<DeregistrationComponent>,
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  /**
  * Closes the deregistration modal without performing any action.
  */
  onCancel(): void {
    this.dialogRef.close(); // Close the modal
  }

  /**
  * Confirms and processes the deregistration request.
  * Deletes the user account, clears local storage, and redirects to the welcome page.
  */
  onConfirm(): void {
    const username = JSON.parse(localStorage.getItem('user') || '{}').username;

    if (username) {
      this.fetchApiData.deleteUser(username).subscribe(
        () => {
          this.snackBar.open('Account successfully deleted.', 'OK', { duration: 6000 });
          this.dialogRef.close(); // Close the modal
          localStorage.clear();
          this.router.navigate(['/welcome']);
        },
        error => {
          this.snackBar.open('Error deleting account. Please try again.', 'OK', { duration: 6000 });
        }
      );
    }
  }
}
