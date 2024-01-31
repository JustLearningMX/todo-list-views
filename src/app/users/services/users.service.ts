import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environments} from "../../../environments/environments";
import {UserDataWithoutTasks, UserFullData} from "../interfaces/User.interface";
import {map, Observable, tap} from "rxjs";
import {ListOfTasks} from "../../tasks/interfaces/list-tasks.interface";
import {User} from "../classes/User.class";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private http: HttpClient = inject(HttpClient);
  private baseUrl: string = environments.baseUrl;

  private _token: string | null = null;

  private _listOfTasks: ListOfTasks[] = [];

  get token(): string | null {

    if (localStorage.getItem('userAuthToken')) {
      const userAuthToken = localStorage.getItem('userAuthToken');
      const fullUser = userAuthToken ? JSON.parse(userAuthToken) : null;
      const { token } = fullUser;
      this._token = token;
      return token;
    }

    return null;
  }

  get user(): User | null {

    if (!localStorage.getItem('user')) {
      this.getUserWithListOfTasksAndTasks();
    }

    const userLS = localStorage.getItem('user');
    return userLS ? JSON.parse(userLS) : null;
  }

  get listOfTasks(): ListOfTasks[] {
    if (!localStorage.getItem('user')) {
      this.getUserWithListOfTasksAndTasks();
    }

    const user: User = this.user as User;
    this._listOfTasks = user.listTasks;

    return this._listOfTasks;
  }

  getUserWithListOfTasksAndTasks(): Observable<UserFullData> {
    const headers = {
      Authorization: `Bearer ${this._token}`
    }
    return this.http.get<UserFullData>(`${this.baseUrl}/users/me`, { headers })
      .pipe(
        tap( data => {
          const user: User = data as User;
          localStorage.setItem('user', JSON.stringify(user));
        }),
      );
  }
}
