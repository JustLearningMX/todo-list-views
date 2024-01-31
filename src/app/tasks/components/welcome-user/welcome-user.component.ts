import { Component, inject, OnInit } from '@angular/core';
import { UserDataWithoutTasks } from "../../../users/interfaces/User.interface";
import { UsersService } from "../../../users/services/users.service";
import { ListOfTasks } from "../../interfaces/list-tasks.interface";
import {User} from "../../../users/classes/User.class";

@Component({
  selector: 'welcome-user',
  templateUrl: './welcome-user.component.html',
  styles: ``
})
export class WelcomeUserComponent implements OnInit {

  user: User | null = null;
  pendingTasks: number = 1;
  listOfTasks: ListOfTasks[] = [];

  private usersService: UsersService = inject(UsersService);

  ngOnInit(): void {

    this.user = this.usersService.user;
    this.listOfTasks = this.usersService.listOfTasks;

  }

}
