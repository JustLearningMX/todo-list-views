import {inject, Injectable, OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {environments} from "../../../environments/environments";
import {UserDataWithoutTasks, UserFullData} from "../interfaces/User.interface";
import {catchError, map, Observable, tap} from "rxjs";
import {ListOfTasks} from "../../tasks/interfaces/list-tasks.interface";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private http: HttpClient = inject(HttpClient);
  private baseUrl: string = environments.baseUrl;

  private _token: string | null = null;

  listOfTasks: ListOfTasks[] = [];

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

  getUserWithListOfTasksAndTasks(): Observable<UserFullData> {
    const headers = {
      Authorization: `Bearer ${this._token}`
    }
    return this.http.get<UserFullData>(`${this.baseUrl}/users/me`, { headers });
  }

  getOnlyListOfTasks(): Observable<ListOfTasks[]> {
    return this.getUserWithListOfTasksAndTasks()
      .pipe(
        map( (user: UserFullData) => {
          const { listTasks } = user;
          return listTasks as ListOfTasks[];
        })
      );
  }

  getUser(): Observable<UserDataWithoutTasks> {
    return this.getUserWithListOfTasksAndTasks()
      .pipe(
        map( (user: UserFullData) => {
          const { listTasks, ...rest } = user;
          return rest as UserDataWithoutTasks;
        })
      )
  }
}
