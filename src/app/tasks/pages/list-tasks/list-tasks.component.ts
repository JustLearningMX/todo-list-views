import { Component, inject, OnInit } from '@angular/core';
import { ListOfTasks } from "../../interfaces/list-tasks.interface";
import { UsersService } from "../../../users/services/users.service";

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

  if ( this.usersService.token ) {
    this.listOfTasks = this.usersService.listOfTasks;
    }

    this.isFetchingData = false;
  }

  onNewListOfTasks(listOfTasks: ListOfTasks) {
    this.listOfTasks.push(listOfTasks);
  }
}
