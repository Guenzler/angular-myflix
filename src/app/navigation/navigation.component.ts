import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service'; // Import your service if needed

/**
* The NavigationComponent provides navigation controls and logout functionality.
*/
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {

  /**
  * Creates an instance of NavigationComponent.
  * @param router - The Angular Router service used for navigation.
  * @param fetchApiData - Service to fetch data from the API (currently unused in this component).
  */
  constructor(private router: Router, private fetchApiData: FetchApiDataService) {
  }

  /**
  * Logs out the user by clearing local storage and redirecting to the welcome page.
  */
  logout(): void {
    // Clear local storage
    localStorage.clear();

    // Redirect to welcome or login page
    this.router.navigate(['/welcome']);
  }
}
