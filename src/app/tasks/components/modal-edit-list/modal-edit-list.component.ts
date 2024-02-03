import {Component, inject, OnInit} from '@angular/core';
import {ListOfTasks} from "../../interfaces/list-tasks.interface";
import {ListTasksService} from "../../services/list-tasks.service";
import {TypeCrudEnum} from "../../interfaces/type-crud-enum";

@Component({
  selector: 'modal-edit-list',
  templateUrl: './modal-edit-list.component.html',
  styles: ``
})
export class ModalEditListComponent implements OnInit {

  private listOfTasksService: ListTasksService = inject(ListTasksService);

  listTasks!: ListOfTasks;

  visible: boolean = false;

  showDialog() {
    this.listOfTasksService.listTasks = this.listTasks;
    this.listOfTasksService.typeOfCrud = TypeCrudEnum.UPDATE;
    this.visible = true;
  }

  cancelDialog(isOpen: boolean):void {
    this.visible = isOpen;
  }

  ngOnInit(): void {
    this.listTasks = this.listOfTasksService.listTasks;
  }

}
