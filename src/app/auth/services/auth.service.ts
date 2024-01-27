import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environments} from "../../../environments/environments";
import {
  UserLoginBody,
  UserLoginResponse,
  UserRegisterBody,
  UserRegisterResponse,
} from "../../users/interfaces/User.interface";

import {catchError, Observable, of, tap, throwError} from "rxjs";
import {getFirstMessageOfError} from "../../shared/utils/Message-values";
import {ResponseError} from "../../shared/interfaces/response-error.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  login(body: UserLoginBody): Observable<UserLoginResponse> {

    return this.http.post<UserLoginResponse>(`${this.baseUrl}/users/auth`, body)
      .pipe(
        tap( user => localStorage.setItem('userAuthToken', JSON.stringify(user)) ),
        catchError(({ error }) => {
          return throwError( () => getFirstMessageOfError(error.messages));
        })
      );
  }

  signup(body: UserRegisterBody): Observable<UserRegisterResponse | ResponseError> {

    return this.http.post<UserRegisterResponse | ResponseError>(`${this.baseUrl}/users`, body)
      .pipe(
        tap((resp) => {
          const userRegisterRes = resp as UserRegisterResponse;
          return of(userRegisterRes);
        }),
        catchError(({ error }) => {
          return throwError( () => getFirstMessageOfError(error.messages));
        })
      );
  }

  checkAuthentication(): Observable<boolean> {

    return !localStorage.getItem('userAuthToken') ? of(false) : of(true);

  }

  logout() {
    localStorage.removeItem('userAuthToken');
  }

}
