// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { SingleMovieComponent } from '../single-movie/single-movie.component';
import { MatSnackBar } from '@angular/material/snack-bar';  // Import MatSnackBar for notifications

/**
* The MovieCardComponent displays a list of movies and provides functionality to view movie details,
* and manage favorites.
*/
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent implements OnInit {

  /**
  * Array to hold the list of movies fetched from the API.
  */
  movies: any[] = [];

  /**
  * Creates an instance of MovieCardComponent.
  * @param fetchApiData - Service for fetching data from the API, including movie data and user favorites.
  * @param dialog - Service for opening dialogs to display additional information.
  * @param snackBar - Service for displaying notifications to the user.
  */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  /**
  * Lifecycle hook that is called after the component has been initialized.
  * Fetches the list of movies.
  */
  ngOnInit(): void {
    this.getMovies();
  }

  /**
  * Fetches all movies from the API and updates the movies array.
  */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  /**
  * Opens a dialog displaying the genre of a movie.
  * @param movie - The movie whose genre will be displayed.
  */
  openGenreDialog(movie: any): void {
    this.dialog.open(GenreDialogComponent, {
      data: { Genre: movie.Genre },
      width: '400px'
    });
  }

  /**
  * Opens a dialog displaying the director of a movie.
  * @param movie - The movie whose director will be displayed.
  */
  openDirectorDialog(movie: any): void {
    this.dialog.open(DirectorDialogComponent, {
      data: { Director: movie.Director },
      width: '400px'
    });
  }

  /**
  * Opens a dialog displaying detailed information about a movie.
  * @param movie - The movie to be displayed in the dialog.
  */
  openSingleMovieDialog(movie: any): void {
    this.dialog.open(SingleMovieComponent, {
      data: { movie: movie },
      width: '400px'
    });
  }

  /**
  * Adds a movie to the user's list of favorites and updates the local storage.
  * Displays a notification to the user indicating success.
  * @param movieID - The ID of the movie to be added to favorites.
  */
  addToFavorites(movieID: string): void {
    let user = JSON.parse(localStorage.getItem("user") || "");
    this.fetchApiData.addToFavorites(user.username, movieID).subscribe((updatedUser: any) => {
      localStorage.setItem("user", JSON.stringify(updatedUser));
      this.snackBar.open('Movie added to favorites!', 'OK', { duration: 6000 });
    });
  }

  /**
  * Removes a movie from the user's list of favorites and updates the local storage.
  * Displays a notification to the user indicating success.
  * @param movieID - The ID of the movie to be removed from favorites.
  */
  removeFromFavorites(movieID: string): void {
    let user = JSON.parse(localStorage.getItem("user") || "");
    this.fetchApiData.removeFromFavorites(user.username, movieID).subscribe((updatedUser: any) => {
      localStorage.setItem("user", JSON.stringify(updatedUser));
      this.snackBar.open('Movie removed from favorites!', 'OK', { duration: 6000 });
    });
  }

  /**
  * Handles the click event to add a movie to favorites.
  * @param movie - The movie to be added to favorites.
  */
  handleFavoriteClick(movie: any): void {
    this.addToFavorites(movie._id);
  }

  /**
  * Handles the click event to remove a movie from favorites.
  * @param movie - The movie to be removed from favorites.
  */
  handleRemoveFavoriteClick(movie: any): void {
    this.removeFromFavorites(movie._id);
  }

  /**
  * Checks if a movie is in the user's list of favorites.
  * @param movie - The movie to check.
  * @returns True if the movie is in favorites, otherwise false.
  */
  isFavorite(movie: any): boolean {
    let user = JSON.parse(localStorage.getItem("user") || "");
    return user.favoriteMovies.includes(movie._id);
  }
}
