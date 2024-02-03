import {Component, inject, Input, OnInit} from '@angular/core';
import { ListOfTasks } from "../../interfaces/list-tasks.interface";
import {ListTasksService} from "../../services/list-tasks.service";

@Component({
  selector: 'list-grid',
  templateUrl: './list-grid.component.html',
  styles: ``
})
export class ListGridComponent {

  constructor(private listTasksService: ListTasksService) { }

  get listOfTasks(): ListOfTasks[] {
    return this.listTasksService.listOfTasks;
  }
}
