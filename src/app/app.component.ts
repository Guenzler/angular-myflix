// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
* Root component of the Angular application.
*/
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'angular-myFlix';

  /**
  * Creates an instance of AppComponent.
  * @param router - The Angular Router service used for navigation.
  */
  constructor(private router: Router) { }

  /**
  * Lifecycle hook that is called after data-bound properties of a directive are initialized.
  * Initializes the component by checking if a user is stored in local storage.
  * Redirects to the /movies route if the user is logged in.
  */
  ngOnInit(): void {
    // Check if a user is stored in local storage
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user) {
      // Redirect to the /movies route if user is logged in
      this.router.navigate(['/movies']);
    }
  }
}
