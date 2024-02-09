import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import Swal from "sweetalert2";

import {ValidatorsService} from "../../../shared/services/validators.service";
import {ListOfTasksRequest} from "../../interfaces/list-tasks.interface";
import {ListTasksService} from "../../services/list-tasks.service";
import {UsersService} from "../../../users/services/users.service";
import {TypeCrudEnum} from "../../interfaces/type-crud-enum";

@Component({
  selector: 'form-list-tasks',
  templateUrl: './form-list-tasks.component.html',
  styles: ``
})
export class FormListTasksComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public validatorService: ValidatorsService,
    private listTasksService: ListTasksService,
    private usersService: UsersService
  ) {}

  @Output()
  onChangeModalVisibility: EventEmitter<boolean> = new EventEmitter();

  listOfTasksReq: ListOfTasksRequest = {
    "name": "",
    "description": "",
    "active": true,
    "tasks": null
  };

  myForm: FormGroup = this.fb.group({
    name:        [ this.listOfTasksReq.name,        [Validators.required, Validators.minLength(3) ]],
    description: [ this.listOfTasksReq.description, [Validators.required, Validators.minLength(3) ]],
  });

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.listOfTasksReq.name =  this.myForm.controls['name'].value;
    this.listOfTasksReq.description =  this.myForm.controls['description'].value;
    this.listOfTasksReq.active = true;
    this.listOfTasksReq.tasks = null;

    if (this.listTasksService.typeOfCrud === TypeCrudEnum.CREATE)
      this.createListTasks();

    if (this.listTasksService.typeOfCrud === TypeCrudEnum.UPDATE)
      this.updateListTasks();


  }

  cancelDialog(): void {
    this.myForm.reset();
    this.onChangeModalVisibility.emit(false);
  }

  ngOnInit(): void {
    this.listOfTasksReq = this.listTasksService.listTasks;

    this.myForm.reset({
      name: this.listOfTasksReq.name,
      description: this.listOfTasksReq.description
    });
  }

  createListTasks() {
    this.listTasksService.create(this.listOfTasksReq)
      .subscribe({
        next: (resp ): void => {

          Swal.fire({
            icon: 'success',
            title: 'Lista creada',
            text: `La lista ${resp.name} se ha creado correctamente`
          });

          this.usersService.getUserWithListOfTasksAndTasks().subscribe();
          this.listTasksService.listOfTasks = [ ...this.listTasksService.listOfTasks, resp ];

          this.myForm.reset();
        },
        error: (err: string): void => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err
          });
        }
      });

    this.onChangeModalVisibility.emit(false);
  }

  updateListTasks(): void {

    if (this.myForm.pristine)
      return;

    console.log('Updating...', this.listOfTasksReq);
    /*this.listTasksService.update(this.listOfTasksReq)
      .subscribe({
        next: (resp ): void => {

          Swal.fire({
            icon: 'success',
            title: 'Lista actualizada',
            text: `La lista ${resp.name} se ha actualizado correctamente`
          });

          this.usersService.getUserWithListOfTasksAndTasks().subscribe();
          this.listTasksService.listOfTasks = this.listTasksService.listOfTasks.map( (list) => list.id === resp.id ? resp : list );

          this.myForm.reset();
          this.onChangeModalVisibility.emit(false);
        },
        error: (err: string): void => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err
          });
        }
      });*/
  }

}
