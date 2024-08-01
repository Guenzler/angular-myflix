import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

/**
 * Authentication guard function to protect routes.
 * @param route - The activated route snapshot that provides the activated route's information.
 * @param state - The router state snapshot that provides the router state information.
 * @returns A boolean indicating whether the route can be activated or a UrlTree for redirection.
 */
export const authGuard: CanActivateFn = (route, state) => {
  // Inject Router service
  const router = inject(Router);

  // Check user authentication status from local storage
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
