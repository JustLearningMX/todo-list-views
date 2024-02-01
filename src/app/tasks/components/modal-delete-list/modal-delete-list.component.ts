import { Component, Input } from '@angular/core';
import { ListOfTasks } from "../../interfaces/list-tasks.interface";

@Component({
  selector: 'modal-delete-list',
  templateUrl: './modal-delete-list.component.html',
  styleUrl: './modal-delete-list.component.css'
})
export class ModalDeleteListComponent {

  @Input()
  listOfTask!: ListOfTasks;

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  cancelDialog() {
    this.visible = false;
  }

  delete() {
    console.log('Eliminando...', this.listOfTask.name);
    this.visible = false;
  }
}
