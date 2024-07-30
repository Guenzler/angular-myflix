import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deregistration',
  templateUrl: './deregistration.component.html',
  styleUrl: './deregistration.component.scss'
})
export class DeregistrationComponent {
  constructor(
    private dialogRef: MatDialogRef<DeregistrationComponent>,
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  onCancel(): void {
    this.dialogRef.close(); // Close the modal
  }

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
