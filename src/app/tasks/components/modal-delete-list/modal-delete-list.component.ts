import {Component, inject, Input, OnInit} from '@angular/core';
import { ListOfTasks } from "../../interfaces/list-tasks.interface";
import Swal from "sweetalert2";
import {ListTasksService} from "../../services/list-tasks.service";
import {UsersService} from "../../../users/services/users.service";

@Component({
  selector: 'modal-delete-list',
  templateUrl: './modal-delete-list.component.html',
  styleUrl: './modal-delete-list.component.css'
})
export class ModalDeleteListComponent implements OnInit {

  private listTasksService: ListTasksService = inject(ListTasksService);
  private usersService: UsersService = inject(UsersService);

  listTasks!: ListOfTasks;

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  cancelDialog() {
    this.visible = false;
  }

  delete() {
    this.listTasksService.delete(this.listTasks.id)
      .subscribe({
        next: (resp ): void => {
          const respSuccess = resp;
          Swal.fire({
            icon: 'success',
            title: 'Lista eliminada',
            text: `La lista ${this.listTasks.name} se ha eliminado exitosamente.`
          });

          this.usersService.getUserWithListOfTasksAndTasks().subscribe();
          this.listTasksService.listOfTasks = this.listTasksService.listOfTasks.filter((list: ListOfTasks) => list.id !== this.listTasks.id);
          this.visible = false;
        },
        error: (err: string): void => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err
          });
        }
      });
    this.visible = false;
  }

  ngOnInit(): void {
    this.listTasks = this.listTasksService.listTasks;
  }
}
