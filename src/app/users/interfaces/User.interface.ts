import { UserRoles } from "./User-roles.enum";
import {ListOfTasks} from "../../tasks/interfaces/list-tasks.interface";

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

export interface UserDataWithoutTasks {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  active: boolean,
  role: UserRoles,
}

export interface UserFullData {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  active: boolean,
  role: UserRoles,
  listTasks: ListOfTasks[],
}
