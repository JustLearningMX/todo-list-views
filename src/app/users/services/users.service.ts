import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, tap, throwError } from "rxjs";
import { environments } from "../../../environments/environments";

import { User } from "../classes/User.class";
import { LocalStorage } from "../../auth/interfaces/LocalStorage.interfaces";
import { getFirstMessageOfError } from "../../shared/utils/Message-values";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private http: HttpClient = inject(HttpClient);
  private baseUrl: string = environments.baseUrl;
  private _token: string | null = this.token;

  get token(): string | null {

    if (localStorage.getItem(LocalStorage.UserAuthToken)) {
      const userAuthToken = localStorage.getItem(LocalStorage.UserAuthToken);
      const fullUserAuth = userAuthToken ? JSON.parse(userAuthToken) : null;
      const { token } = fullUserAuth;
      this._token = token;
      return token;
    }

    return null;
  }

  getUserWithListOfTasksAndTasks(): Observable<User> {

    const headers = {
      Authorization: `Bearer ${this._token}`
    }
    return this.http.get<User>(`${this.baseUrl}/users/me`, { headers })
      .pipe(
        tap( data => { localStorage.setItem(LocalStorage.User, JSON.stringify(data)) } ),
        catchError(({ error }) => {
          return throwError( () => getFirstMessageOfError(error.messages));
        })
      );
  }
}
