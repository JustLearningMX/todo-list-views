import {Component, inject} from '@angular/core';

import {ListOfTasks, ListOfTasksRequest} from "../../interfaces/list-tasks.interface";
import {ListTasksService} from "../../services/list-tasks.service";
import {TypeCrudEnum} from "../../interfaces/type-crud-enum";

@Component({
  selector: 'modal-add-list',
  templateUrl: './modal-add-list.component.html',
  styleUrl: './modal-add-list.component.css'
})
export class ModalAddListComponent {

  private listOfTasksService: ListTasksService = inject(ListTasksService);

  listOfTasksReq: ListOfTasks = {
    "id": 0,
    "name": "",
    "description": "",
    "active": true,
    "tasks": []
  };

  visible: boolean = false;

  showDialog() {
    this.listOfTasksService.listTasks = {...this.listOfTasksReq};
    this.listOfTasksService.typeOfCrud = TypeCrudEnum.CREATE;
    this.visible = true;
  }

  cancelDialog(isOpen: boolean):void {
    this.visible = isOpen;
  }
}
