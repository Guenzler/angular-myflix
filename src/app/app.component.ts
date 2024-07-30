// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'angular-myFlix';
  constructor(private router: Router) { }

  ngOnInit(): void {
    // Check if a user is stored in local storage
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user) {
      // Redirect to the /movies route if user is logged in
      this.router.navigate(['/movies']);
    }
  }
}
