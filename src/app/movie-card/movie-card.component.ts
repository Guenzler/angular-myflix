// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { SingleMovieComponent } from '../single-movie/single-movie.component';
import { MatSnackBar } from '@angular/material/snack-bar';  // Import MatSnackBar for notifications

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  openGenreDialog(movie: any): void {
    this.dialog.open(GenreDialogComponent, {
      data: { Genre: movie.Genre },
      width: '400px'
    });
  }

  openDirectorDialog(movie: any): void {
    this.dialog.open(DirectorDialogComponent, {
      data: { Director: movie.Director },
      width: '400px'
    });
  }

  openSingleMovieDialog(movie: any): void {
    this.dialog.open(SingleMovieComponent, {
      data: { movie: movie },
      width: '400px'
    });
  }

  addToFavorites(movieID: string): void {
    let user = JSON.parse(localStorage.getItem("user") || "");
    this.fetchApiData.addToFavorites(user.username, movieID).subscribe((updatedUser: any) => {
      localStorage.setItem("user", JSON.stringify(updatedUser));
      this.snackBar.open('Movie added to favorites!', 'OK', { duration: 6000 });
    });
  }

  removeFromFavorites(movieID: string): void {
    let user = JSON.parse(localStorage.getItem("user") || "");
    this.fetchApiData.removeFromFavorites(user.username, movieID).subscribe((updatedUser: any) => {
      localStorage.setItem("user", JSON.stringify(updatedUser));
      this.snackBar.open('Movie removed from favorites!', 'OK', { duration: 6000 });
    });
  }

  // Add this function to be used in HTML
  handleFavoriteClick(movie: any): void {
    this.addToFavorites(movie._id);
  }

  handleRemoveFavoriteClick(movie: any): void {
    this.removeFromFavorites(movie._id);
  }

  isFavorite(movie: any): boolean {
    let user = JSON.parse(localStorage.getItem("user") || "");
    return user.favoriteMovies.includes(movie._id);
  }
}
