import { Component, inject } from '@angular/core';
import { TypeCrudEnum } from "../../interfaces/type-crud-enum";
import { TasksService } from "../../services/tasks.service";

@Component({
  selector: 'modal-add-task',
  templateUrl: './modal-add-task.component.html',
  styles: ``
})
export class ModalAddTaskComponent {

  private taskService: TasksService = inject(TasksService);

  visible: boolean = false;

  showDialog() {
    this.taskService.typeOfCrud = TypeCrudEnum.CREATE;
    this.visible = true;
  }

  cancelDialog(isOpen: boolean):void {
    this.visible = isOpen;
  }

}
