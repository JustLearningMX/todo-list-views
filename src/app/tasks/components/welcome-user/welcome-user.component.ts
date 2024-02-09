import { Component, inject, OnInit } from '@angular/core';

import { UsersService } from "../../../users/services/users.service";
import { User } from "../../../users/classes/User.class";

import Swal from "sweetalert2";

@Component({
  selector: 'welcome-user',
  templateUrl: './welcome-user.component.html',
  styleUrls: ['./welcome-user.component.css']
})
export class WelcomeUserComponent implements OnInit {

  private usersService: UsersService = inject(UsersService);

  user: User | null = null;

  get pendingTasks(): number {
    return this.usersService.pendingTasks;
  }

  get message(): string {
    return this.pendingTasks < 1 ? 'Sin tareas pendientes' :
      this.pendingTasks === 1 ? '1 tarea pendiente' :
        `${this.pendingTasks} tareas pendientes`;
  }

  ngOnInit(): void {

    this.usersService
      .getUserWithListOfTasksAndTasks().subscribe(  {
        next: (user: User) => {
          this.user = user;
        },
        error: (err: string): void => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err
          });
        }
      });

  }

}
