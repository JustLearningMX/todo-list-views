import { Component, Input, OnInit } from '@angular/core';
import { Task } from "../../interfaces/task.interface";

@Component({
  selector: 'tasks-grid',
  templateUrl: './tasks-grid.component.html',
  styles: ``
})
export class TasksGridComponent implements OnInit {

  @Input() tasks!: Task[];

  ngOnInit() {

  }

}
