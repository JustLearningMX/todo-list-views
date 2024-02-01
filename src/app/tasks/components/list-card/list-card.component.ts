import {Component, Input} from '@angular/core';
import {ListOfTasks} from "../../interfaces/list-tasks.interface";

@Component({
  selector: 'list-card',
  templateUrl: './list-card.component.html',
  styleUrl: './list-card.component.css'
})
export class ListCardComponent {
  @Input()
  listOfTask!: ListOfTasks;

}
