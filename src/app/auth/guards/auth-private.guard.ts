import { CanMatchFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { tap } from "rxjs";

import { AuthService } from "../services/auth.service";

export const authPrivateGuard: CanMatchFn = (route, segments) => {
  return checkAuthStatus();
};

const checkAuthStatus = () => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);

  return authService.checkAuthentication()
    .pipe(
      tap( isAuthenticated => {
        if ( !isAuthenticated ) {
          router.navigate(['/auth/login']);
        }
      })
    );
}
