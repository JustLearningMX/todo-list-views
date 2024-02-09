import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { switchMap } from "rxjs";

import { ListTasksService } from "../../services/list-tasks.service";
import { ListOfTasks } from "../../interfaces/list-tasks.interface";
import { Task } from "../../interfaces/task.interface";
import { TasksService } from "../../services/tasks.service";

@Component({
  selector: 'tasks-page',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {

  private listTasksService: ListTasksService = inject(ListTasksService);
  private taskService: TasksService = inject(TasksService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  private router: Router = inject(Router);

  isFetchingData: boolean = true;

  ngOnInit() {

    this.isFetchingData = true;

    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.listTasksService.getListById(id) ),
      )
      .subscribe( (list) => {

        if(!list) {
          this.router.navigateByUrl('/mis-listas');
          this.isFetchingData = false;
          return;
        }

        this.listTasksService.listTasks = list;
        this.taskService.tasks = list.tasks;
        this.isFetchingData = false;
      } );

  }

  get listTasks(): ListOfTasks {
    return this.listTasksService.listTasks;
  }

  get tasks(): Task[] {
    return this.taskService.tasks;
  }

}
