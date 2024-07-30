import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { DeregistrationComponent } from '../deregistration/deregistration.component';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})

export class UserProfileComponent implements OnInit {

  // get userdata from local storage, this contains all userdata including favorit movies
  userData: any = JSON.parse(localStorage.getItem('user') || '{}');
  favoriteMovies: any[] = [];

  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // Set password to an empty string
    this.userData.password = ''; // Clear the password field
    this.getFavoriteMovies();
    if (this.userData.birthdate) {
      this.userData.birthdate = this.formatDate(this.userData.birthdate);
    }
  }

  // Function to convert ISO date string to yyyy-MM-dd format
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp.filter((movie: any) =>
        this.userData.favoriteMovies.includes(movie._id)
      );
      console.log(this.favoriteMovies);
    });
  }

  updateUser(form: NgForm): void {
    if (form.valid) {
      const updatedUser = {
        username: this.userData.username,
        email: form.value.email,
        birthdate: form.value.birthdate,
        password: form.value.password
      };

      this.fetchApiData.updateUser(updatedUser).subscribe((response) => {
        // Update local storage with new user data
        localStorage.setItem('user', JSON.stringify(response));
        this.snackBar.open('User information updated successfully', 'OK', {
          duration: 4000
        });
      }, (error) => {
        this.snackBar.open('Failed to update user information', 'OK', {
          duration: 6000
        });
      });
    } else {
      this.snackBar.open('Please fill in all required fields', 'OK', {
        duration: 6000
      });
    }
  }
  handleRemoveFavoriteClick(movie: any): void {
    this.removeFromFavorites(movie._id);
  }

  removeFromFavorites(movieID: string): void {
    let user = JSON.parse(localStorage.getItem("user") || "");
    this.fetchApiData.removeFromFavorites(user.username, movieID).subscribe((updatedUser: any) => {
      localStorage.setItem("user", JSON.stringify(updatedUser));
      this.snackBar.open('Movie removed from favorites!', 'OK', { duration: 6000 });
      this.userData = updatedUser;
      this.userData.password = ''; // Clear the password field
      this.getFavoriteMovies();
    });
  }

  openDeregisterModal(): void {
    const dialogRef = this.dialog.open(DeregistrationComponent, {
      width: '300px'
    });
  }
}
