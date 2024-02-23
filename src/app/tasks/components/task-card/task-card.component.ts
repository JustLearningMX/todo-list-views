import {Component, Input} from '@angular/core';
import {Task} from "../../interfaces/task.interface";

@Component({
  selector: 'task-card',
  templateUrl: './task-card.component.html',
  styles: ``
})
export class TaskCardComponent {
  @Input() task!: Task;

}
