import {Component, inject, OnInit} from '@angular/core';
import {UsersService} from "../../../users/services/users.service";
import {ListOfTasks} from "../../interfaces/list-tasks.interface";
import {User} from "../../../users/classes/User.class";
import Swal from "sweetalert2";
import {TaskState} from "../../interfaces/task-state.enum";

@Component({
  selector: 'welcome-user',
  templateUrl: './welcome-user.component.html',
  styleUrls: ['./welcome-user.component.css']
})
export class WelcomeUserComponent implements OnInit {

  user: User | null = null;
  pendingTasks: number | null = null;
  listOfTasks: ListOfTasks[] = [];
  message: string = '';

  private usersService: UsersService = inject(UsersService);

  ngOnInit(): void {

    this.usersService
      .getUserWithListOfTasksAndTasks().subscribe(  {
        next: (user: User) => {
          this.user = user;
          this.listOfTasks = user.listTasks;
          this.pendingTasks = user.listTasks.reduce(
            (acc, list) =>
              acc + list.tasks.filter(
                task => (task.state != TaskState.PENDING)
              ).length, 0 );

          this.message = this.pendingTasks < 1 ? 'Sin tareas pendientes' :
                         this.pendingTasks === 1 ? '1 tarea pendiente' :
                         `${this.pendingTasks} tareas pendientes`;
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
