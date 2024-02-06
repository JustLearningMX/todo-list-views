import {Component, inject, OnInit} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs";

import { ListTasksService } from "../../services/list-tasks.service";
import { ListOfTasks } from "../../interfaces/list-tasks.interface";
import { Task } from "../../interfaces/task.interface";

@Component({
  selector: 'tasks-page',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {

  private listTasksService: ListTasksService = inject(ListTasksService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  listTasks: ListOfTasks = {} as ListOfTasks;
  tasks: Task[] = [];
  isTasksEmpty: boolean = !this.tasks || this.tasks.length <= 0;

  isFetchingData: boolean = true;

  ngOnInit() {

    this.isFetchingData = true;

    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.listTasksService.getListById(id) ),
      )
      .subscribe( (list) => {
        this.listTasks = list;
        this.tasks = list.tasks
        this.isFetchingData = false;
      } );

  }

}
