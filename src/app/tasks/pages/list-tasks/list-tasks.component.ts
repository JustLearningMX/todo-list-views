import { Component, inject, OnInit } from '@angular/core';

import Swal from "sweetalert2";

import { ListOfTasks } from "../../interfaces/list-tasks.interface";
import { UsersService } from "../../../users/services/users.service";
import { User } from "../../../users/classes/User.class";
import { ListTasksService } from "../../services/list-tasks.service";

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
  
}
