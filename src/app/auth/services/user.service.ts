import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environments } from "../../../environments/environments";
import {UserLoginBody, UserLoginResponse, UserLoginResponseError} from "../interfaces/users/User.interface";
import {catchError, Observable, of, tap, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  loginUser(body: UserLoginBody): Observable<UserLoginResponse | UserLoginResponseError> {

    return this.http.post<UserLoginResponse | UserLoginResponseError>(`${this.baseUrl}/users/auth`, body)
      .pipe(
        tap((resp) => {
          const userLoginResponse = resp as UserLoginResponse;
          return of(userLoginResponse);
        }),
        catchError(({ error }) => {
          /*const userLoginResponseError: UserLoginResponseError = err.error as UserLoginResponseError;
          return of(userLoginResponseError);*/
          const errorMessage: string = error.statusCode === 400 ? 'Email o Contraseña incorrecta' :
            error.statusCode === 404 ? 'Usuario no encontrado' : 'Error del servidor';
          return throwError( () => errorMessage)
        })
      );

  }

}
