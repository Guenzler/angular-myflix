import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

/**
* Base URL of the API from where movies are fetched
*/
const apiUrl = 'https://movie-app-2024-716106e34297.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {

  /**
  * Inject the HttpClient module to the constructor params
  * This will provide HttpClient to the entire class, making it available via this.http
  */
  constructor(private http: HttpClient) {
  }

  private getToken(): string {
    const token = localStorage.getItem('token');
    return token ? token : '';
  }

  /**
   * Registers a new user.
   * @param userDetails - An object containing user details
   * @returns An Observable that emits the user object 
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
  * API call to log in user
  * @param userDetails - An object containing user details
  * @returns An Observable that emits an object containing the user object and a token
  */
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
  * API call to update user information
  * @param userDetails - An object containing user details
  * @returns An Observable that emits the updated user object 
  */
  public updateUser(userDetails: any): Observable<any> {
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

  /**
  * API call to deregister a use
  * @param username - username of logged in user
  * @returns An Observable that that emits a text response 
  */
  public deleteUser(username: string): Observable<any> {
    return this.http.delete(apiUrl + 'users/' + username, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      }),
      responseType: 'text' // Expecting a text response
    }
    ).pipe(
      map(response => {
        // The response is just a text message, so no need to process further
        return response;
      }),
      catchError(this.handleError)
    );
  }

  /**
  * API call to add movie to list of favorites
  * @param username - username of logged in user
  * @param movieID - ID of movie that should be added to favorites
  * @returns An Observable that emits the updated user object 
  */
  public addToFavorites(username: string, movieID: string): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(apiUrl + 'users/' + username + '/' + movieID, null, { headers })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
  * API call to remove movie from list of favorites
  * @param username - username of logged in user
  * @param movieID - ID of movie that should be removed from favorites
  * @returns An Observable that emits the updated user object 
  */
  public removeFromFavorites(username: string, movieID: string): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(apiUrl + 'users/' + username + '/' + movieID, { headers })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
  * API call to get favorite movies of logged in user
  * @param username - username of logged in user
  * @returns An Observable that emits an array of movie IDs
  */
  public getAllFavorites(username: string): Observable<any> {
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

  /**
  * API call to get all movies
  * @returns An Observable that emits an array of movie objects
  */
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

  /**
  * API call to get information about genre by title
  * @param genre - genre title
  * @returns An Observable that emits an object containing genre information
  */
  public getGenre(genre: string): Observable<any> {
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

  /**
  * API call to get information about director by name
  * @param director - director name
  * @returns An Observable that emits an object containing director information
  */
  public getDirector(director: string): Observable<any> {
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

  /**
  * API call to get information about a movie by title
  * @param title - movie title
  * @returns An Observable that emits a movie object
  */
  public getSingleMovie(title: string): Observable<any> {
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

  /**
  * Checks response
  * @param res - The HTTP response.
  * @returns returns either the response or an empty object
  */
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
