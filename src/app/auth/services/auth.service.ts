import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environments} from "../../../environments/environments";
import {
  UserLoginBody,
  UserLoginResponse,
  UserLoginResponseError,
  UserRegisterBody, UserRegisterResponse, UserRegisterResponseError
} from "../interfaces/users/User.interface";
import {catchError, map, Observable, of, tap, throwError} from "rxjs";
import {UserMessages} from "../interfaces/users/User-messages.enum";
import {getFirstMessageOfError} from "../../shared/utils/Message-values";

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

  signup(body: UserRegisterBody): Observable<UserRegisterResponse | UserRegisterResponseError> {

    return this.http.post<UserRegisterResponse | UserRegisterResponseError>(`${this.baseUrl}/users`, body)
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
