import { Component, Input } from '@angular/core';
import { ListOfTasks } from "../../interfaces/list-tasks.interface";

@Component({
  selector: 'list-grid',
  templateUrl: './list-grid.component.html',
  styles: ``
})
export class ListGridComponent {

  @Input()
  listOfTasks: ListOfTasks[] = [];

}
