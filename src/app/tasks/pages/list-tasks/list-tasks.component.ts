import { Component, inject, OnInit } from '@angular/core';
import { ListOfTasks } from "../../interfaces/list-tasks.interface";
import { UsersService } from "../../../users/services/users.service";
import {User} from "../../../users/classes/User.class";
import Swal from "sweetalert2";

@Component({
  selector: 'list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrl: './list-tasks.component.css'
})
export class ListTasksComponent implements OnInit {

  listOfTasks: ListOfTasks[] = [];
  isFetchingData: boolean = true;

  private usersService: UsersService = inject(UsersService);

  ngOnInit(): void {

    this.usersService
      .getUserWithListOfTasksAndTasks().subscribe({
        next: (user: User) => this.listOfTasks = user.listTasks,
        error: (err: string): void => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err
          });
        }
      });

    this.isFetchingData = false;
  }

  onNewListOfTasks(listOfTasks: ListOfTasks) {
    this.listOfTasks.push(listOfTasks);
  }
}
