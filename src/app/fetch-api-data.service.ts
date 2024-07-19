import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


//Declaring the api url that will provide data for the client app
const apiUrl = 'https://movie-app-2024-716106e34297.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {

  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  private getToken(): string {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).token : '';
}

  // api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // api call for the user login endpoint
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // api call for updating user informtion
  public updateUser(userDetails: any): Observable<any> {
    console.log(userDetails);
    const username = userDetails.username; //if done this way user can't change their username, else use username from local storage
    return this.http.put(apiUrl + 'users/' + username, userDetails, {
      headers: new HttpHeaders(
        { Authorization: `Bearer ${this.getToken()}`, }
      )
    }
    ).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // api call for deleting user
  public deleteUser(username: string): Observable<any> {
    console.log(username);
    return this.http.delete(apiUrl + 'users/' + username, {
      headers: new HttpHeaders(
        { Authorization: `Bearer ${this.getToken()}`, }
      )
    }
    ).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // api call for adding movie to favorites
  public addToFavorites(username: string, movieID: string ): Observable<any> {
    console.log(username, movieID);
    return this.http.post(apiUrl + 'users/' + username + '/' + movieID, {
      headers: new HttpHeaders(
        { Authorization: `Bearer ${this.getToken()}`, }
      )
    }
    ).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // api call for removing movie from favorites
  public removeFromFavorites(username: string, movieID: string ): Observable<any> {
    console.log(username, movieID);
    return this.http.delete(apiUrl + 'users/' + username + '/' + movieID, {
      headers: new HttpHeaders(
        { Authorization: `Bearer ${this.getToken()}`, }
      )
    }
    ).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // api call for getting all favorite movies for a user
  public getAllFavorites(username: string ): Observable<any> {
    console.log(username);
    return this.http.get(apiUrl + 'users/' + username + '/favoriteMovies', {
      headers: new HttpHeaders(
        { Authorization: `Bearer ${this.getToken()}`, }
      )
    }
    ).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

   // api call for getting all movies
  public getAllMovies(): Observable<any> {
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${this.getToken()}`,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // api call for getting information about a genre
  public getGenre(genre: string ): Observable<any> {
    return this.http.get(apiUrl + 'movies/genre/' + genre, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${this.getToken()}`,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // api call for getting information about a director
  public getDirector(director: string ): Observable<any> {
    return this.http.get(apiUrl + 'movies/directors/' + director, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${this.getToken()}`,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // api call for getting information about a single movie
  public getSingleMovie(title: string ): Observable<any> {
    return this.http.get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${this.getToken()}`,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Non-typed response check
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
