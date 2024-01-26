import { Component, inject, OnInit } from '@angular/core';
import { UserDataWithoutTasks } from "../../../users/interfaces/User.interface";
import { UsersService } from "../../../users/services/users.service";
import { ListOfTasks } from "../../interfaces/list-tasks.interface";

@Component({
  selector: 'welcome-user',
  templateUrl: './welcome-user.component.html',
  styles: ``
})
export class WelcomeUserComponent implements OnInit {

  user: UserDataWithoutTasks | null = null;
  pendingTasks: number = 1;
  listOfTasks: ListOfTasks[] = [];

  private usersService: UsersService = inject(UsersService);

  ngOnInit(): void {

    this.usersService.setToken();

    if ( this.usersService.token ) {

      this.usersService.getUser()
        .subscribe( (user: UserDataWithoutTasks) => {
          this.user = user;
        });

      this.usersService.getOnlyListOfTasks()
        .subscribe( (list: ListOfTasks[]) => {
          this.listOfTasks = list as ListOfTasks[];
        });
    }

  }

}
