import { CanMatchFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import {map, tap} from "rxjs";

import { AuthService } from "../services/auth.service";

export const authPublicGuard: CanMatchFn = (route, segments) => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);

  return authService.checkAuthentication()
    .pipe(
      tap(
        isAuthenticated => {
          if ( isAuthenticated ) {
            router.navigate(['/mis-listas']);
          }
        }),
      map( isAuthenticated => !isAuthenticated)
    );
};
