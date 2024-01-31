import {UserFullData} from "../interfaces/User.interface";
import {UserRoles} from "../interfaces/User-roles.enum";
import {ListOfTasks} from "../../tasks/interfaces/list-tasks.interface";

export class User implements UserFullData {
  constructor(
    public readonly id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public active: boolean,
    public role: UserRoles,
    public listTasks: ListOfTasks[],
  ) { }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  get isAdmin() {
    return this.role === UserRoles.ADMIN;
  }
}
