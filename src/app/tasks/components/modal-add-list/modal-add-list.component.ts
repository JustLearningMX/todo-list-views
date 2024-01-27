import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {ListOfTasks, ListOfTasksRequest} from "../../interfaces/list-tasks.interface";
import {ValidatorsService} from "../../../shared/services/validators.service";
import {ListTasksService} from "../../services/list-tasks.service";

import Swal from 'sweetalert2'

@Component({
  selector: 'modal-add-list',
  templateUrl: './modal-add-list.component.html',
  styleUrl: './modal-add-list.component.css'
})
export class ModalAddListComponent {

  constructor(
    private fb: FormBuilder,
    public validatorService: ValidatorsService,
    private listTasksService: ListTasksService
  ) {}

  private listOfTasksReq: ListOfTasksRequest = {
    "name": "",
    "description": "",
    "active": true,
    "tasks": null
  };

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(3)]],
  });

  @Output()
  onNewListOfTasks: EventEmitter<ListOfTasks> = new EventEmitter();

  visible: boolean = false;

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.listOfTasksReq.name =  this.myForm.controls['name'].value;
    this.listOfTasksReq.description =  this.myForm.controls['description'].value;
    this.listOfTasksReq.active = true;
    this.listOfTasksReq.tasks = null;

    this.listTasksService.createListTasks(this.listOfTasksReq)
      .subscribe({
        next: (resp: ListOfTasks ): void => {
          const respSuccess = resp as ListOfTasks;
          Swal.fire({
            icon: 'success',
            title: 'Lista creada',
            text: `La lista ${respSuccess.name} se ha creado correctamente`
          });

          this.onNewListOfTasks.emit(respSuccess);
          this.myForm.reset();
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
  }

  showDialog() {
    this.visible = true;
  }

  cancelDialog() {
    this.visible = false;
    this.myForm.reset();
  }
}
