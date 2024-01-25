import {Component, OnInit} from '@angular/core';
import {UserLoginResponse} from "../../../auth/interfaces/users/User.interface";

@Component({
  selector: 'welcome-user',
  templateUrl: './welcome-user.component.html',
  styles: ``
})
export class WelcomeUserComponent implements OnInit {

  user: UserLoginResponse | null = null;
  pendingTasks: number = 0;

  constructor() { }

  ngOnInit(): void {

    if (localStorage.getItem('userAuthToken')) {
      const userAuthToken = localStorage.getItem('userAuthToken');
      this.user = userAuthToken ? JSON.parse(userAuthToken) : null;
    }

    if ( this.user ) {
      console.log(this.user);
    }

  }

}
