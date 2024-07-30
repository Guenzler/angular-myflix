import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

// Define the guard function
export const authGuard: CanActivateFn = (route, state) => {
  // Inject Router and other services here
  const router = inject(Router);

  // Check user authentication status
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  if (user) {
    // User is authenticated, allow access
    return true;
  } else {
    // User is not authenticated, redirect to welcome page
    router.navigate(['/welcome']);
    return false;
  }
};
