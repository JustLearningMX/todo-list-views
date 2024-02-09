import { inject, Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { environments } from "../../../environments/environments";

import { TypeCrudEnum } from "../interfaces/type-crud-enum";
import { OneTaskBodyRequest, Task } from "../interfaces/task.interface";
import { UsersService } from "../../users/services/users.service";
import { AuthService } from "../../auth/services/auth.service";
import { getFirstMessageOfError } from "../../shared/utils/Message-values";

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private userService: UsersService = inject(UsersService);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private http: HttpClient = inject(HttpClient);

  private baseUrl: string = environments.baseUrl;

  private token: string | null = this.userService.token;
  private _typeOfCrud: TypeCrudEnum = TypeCrudEnum.NONE;
  private _tasks: Task[] = [];

  get tasks(): Task[] {
    return this._tasks;
  }

  set tasks(value: Task[]) {
    this._tasks = value;
  }

  get typeOfCrud(): TypeCrudEnum {
    return this._typeOfCrud;
  }

  set typeOfCrud(value: TypeCrudEnum) {
    this._typeOfCrud = value;
  }

  create(body: OneTaskBodyRequest ): Observable<Task> {
    this.checkToken();

    const headers = {
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    }

    return this.http.post<Task>(`${this.baseUrl}/tasks`, body, { headers })
      .pipe(
        catchError(({ error }) => {
          return throwError( () => error.messages ? getFirstMessageOfError(error.messages) : 'Error en el servidor al crear la tarea');
        })
      );
  }

  checkToken() {
    if ( !this.token ) {
      this.authService.logout();
      this.router.navigateByUrl('/auth/login');
    }
  }
}
