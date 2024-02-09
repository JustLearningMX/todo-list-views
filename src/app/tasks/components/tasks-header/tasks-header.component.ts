import { Component, inject } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from "../../../auth/services/auth.service";

@Component({
  selector: 'tasks-header',
  templateUrl: './tasks-header.component.html',
  styleUrl: `./tasks-header.component.css`
})
export class TasksHeaderComponent {

  private router: Router = inject(Router);
  authService: AuthService = inject(AuthService);

  constructor() {
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

}
