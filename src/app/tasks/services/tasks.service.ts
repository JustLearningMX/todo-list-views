import {inject, Injectable} from '@angular/core';
import {UsersService} from "../../users/services/users.service";
import {map, Observable} from "rxjs";
import {ListOfTasks} from "../interfaces/list-tasks.interface";

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private userService: UsersService = inject(UsersService);

  getListById(id: number):Observable<ListOfTasks> {
    return this.userService.getUserWithListOfTasksAndTasks()
      .pipe(
        map( data => data.listTasks),
        map( listTasks => listTasks.filter( list => list.id === Number(id) )[0]),
      )
  }
}
