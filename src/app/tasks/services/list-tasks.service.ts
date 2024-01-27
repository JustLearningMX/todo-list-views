import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Router} from "@angular/router";
import { environments } from "../../../environments/environments";
import {catchError, Observable, tap, throwError} from "rxjs";

import { ListOfTasks, ListOfTasksRequest } from "../interfaces/list-tasks.interface";
import { UsersService } from "../../users/services/users.service";
import { AuthService } from "../../auth/services/auth.service";
import { getFirstMessageOfError } from "../../shared/utils/Message-values";

@Injectable({
  providedIn: 'root'
})
export class ListTasksService {

  constructor(
    private http: HttpClient,
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router
  ) { }

  private token: string | null = this.usersService.token
  baseUrl: string = environments.baseUrl;

  createListTasks( body: ListOfTasksRequest ): Observable<ListOfTasks> {

    if ( !this.token ) {
      this.authService.logout();
      this.router.navigateByUrl('/auth/login');
    }

    const headers = {
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    }

    return this.http.post<ListOfTasks>(this.baseUrl + '/list-tasks', body, { headers })
      .pipe(
        catchError(({ error }) => {
          return throwError( () => getFirstMessageOfError(error.messages));
        })
      );
  }
}
