import {Component, inject, Input, OnInit} from '@angular/core';
import { ListOfTasks } from "../../interfaces/list-tasks.interface";
import { UsersService } from "../../../users/services/users.service";
import {User} from "../../../users/classes/User.class";
import Swal from "sweetalert2";
import {ListTasksService} from "../../services/list-tasks.service";

@Component({
  selector: 'list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrl: './list-tasks.component.css'
})
export class ListTasksComponent implements OnInit {

  isFetchingData: boolean = true;

  private usersService: UsersService = inject(UsersService);
  private listOfTasksService: ListTasksService = inject(ListTasksService);

  ngOnInit(): void {
    this.usersService
      .getUserWithListOfTasksAndTasks().subscribe({
        next: (user: User) => {
          this.listOfTasksService.listOfTasks = user.listTasks;
          this.isFetchingData = false;
        },
        error: (err: string): void => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err
          });
          this.isFetchingData = false;
        }
      });
  }

  //Return the list of tasks from the service
  get listOfTasks(): ListOfTasks[] {
    return this.listOfTasksService.listOfTasks;
  }

  //Add a new list of tasks to the service
  onNewListOfTasks(listOfTasks: ListOfTasks): void {
    this.listOfTasksService.listOfTasks.push(listOfTasks);
  }
}
