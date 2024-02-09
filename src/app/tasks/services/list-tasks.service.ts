import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Router} from "@angular/router";
import { environments } from "../../../environments/environments";
import {catchError, map, Observable, of, tap, throwError} from "rxjs";

import { ListOfTasks, ListOfTasksRequest } from "../interfaces/list-tasks.interface";
import { UsersService } from "../../users/services/users.service";
import { AuthService } from "../../auth/services/auth.service";
import { getFirstMessageOfError } from "../../shared/utils/Message-values";
import {DeleteResponse} from "../../shared/interfaces/delete.interface";
import {TypeCrudEnum} from "../interfaces/type-crud-enum";

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

  private token: string | null = this.usersService.token;
  private _listOfTasks: ListOfTasks[] = [];
  private _listTasks: ListOfTasks | null = null;
  private _typeOfCrud: TypeCrudEnum = TypeCrudEnum.NONE;

  private baseUrl: string = environments.baseUrl;

get listOfTasks(): ListOfTasks[] {
  return this._listOfTasks.filter( (list) => list.active);
}

set listOfTasks(value: ListOfTasks[]) {
  this._listOfTasks = value;
}

get listTasks(): ListOfTasks {
  return this._listTasks ? this._listTasks : {} as ListOfTasks;
}

set listTasks(value: ListOfTasks) {
  this._listTasks = value;
}

getListById(id: number):Observable<ListOfTasks> {
  return this.usersService.getUserWithListOfTasksAndTasks()
    .pipe(
      map( data => data.listTasks),
      map( listTasks => listTasks.filter( list => list.id === Number(id) )[0]),
    )
}

get typeOfCrud(): TypeCrudEnum {
  return this._typeOfCrud;
}

set typeOfCrud(value: TypeCrudEnum) {
  this._typeOfCrud = value;
}

  create(body: ListOfTasksRequest ): Observable<ListOfTasks> {

    this.checkToken();

    const headers = {
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    }

    return this.http.post<ListOfTasks>(this.baseUrl + '/list-tasks', body, { headers })
      .pipe(
        catchError(({ error }) => {
          return throwError( () => error.messages ? getFirstMessageOfError(error.messages) : 'Error en el servidor al crear la lista');
        })
      );
  }

  delete( id: number ): Observable<DeleteResponse> {
    this.checkToken();

    const headers = {
      Authorization: `Bearer ${this.token}`,
    }

    return this.http.delete<DeleteResponse>(`${this.baseUrl}/list-tasks/${id}`, { headers })
      .pipe(
        catchError(({ error }) => {
          return throwError( () => error.messages ? getFirstMessageOfError(error.messages) : 'Error en el servidor al eliminar la lista');
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


