import { UserRoles } from "./User-roles.enum";

export interface UserLoginBody {
  email: string;
  password: string;
}

export interface UserLoginResponse {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  token: string
}

export interface UserLoginResponseError {
  isError: boolean,
  timestamp: Date,
  statusCode: number,
  path: string,
  messages: string[]
}

export interface UserRegisterBody {
  firstName: string,
  lastName: string,
  email: string,
  password: string;
  role: UserRoles,
  active: boolean
}

export interface UserRegisterResponse {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  active: boolean,
  role: UserRoles,
  listTasks: null | [],
}

export interface UserRegisterResponseError {
  isError: boolean,
  statusCode: number,
  path: string,
  timestamp: Date,
  messages: string[],
}
