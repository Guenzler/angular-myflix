import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service'; // Import your service if needed


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {

  constructor(private router: Router, private fetchApiData: FetchApiDataService) {
  }

  logout(): void {
    // Clear local storage
    localStorage.clear();
    console.log('user logged out');

    // Redirect to welcome or login page
    this.router.navigate(['/welcome']);
  }
}
