import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import {Dropdown} from "primeng/dropdown";

import { OneTaskBodyRequest, TaskBody } from "../../interfaces/task.interface";
import { TaskState } from "../../interfaces/task-state.enum";
import { TaskPriority } from "../../interfaces/task-priority.enum";
import { ValidatorsService } from "../../../shared/services/validators.service";
import { GetParamsService } from "../../../shared/services/get-params.service";
import { ListTasksService } from "../../services/list-tasks.service";
import { ListOfTasks } from "../../interfaces/list-tasks.interface";
import { TasksService } from "../../services/tasks.service";
import { TypeCrudEnum } from "../../interfaces/type-crud-enum";
import { UsersService } from "../../../users/services/users.service";

import Swal from "sweetalert2";

@Component({
  selector: 'form-tasks',
  templateUrl: './form-tasks.component.html',
  styles: ``
})
export class FormTasksComponent implements OnInit {

  isParamId: boolean = false;
  lists: ListOfTasks[] = [];

  @ViewChild('listOfTasksDropdown')
  listOfTasksDropdown!: Dropdown;

  constructor(
    private fb: FormBuilder,
    private paramService: GetParamsService,
    private activeRoute: ActivatedRoute,
    private listOfTasksService: ListTasksService,
    private taskService: TasksService,
    public validatorService: ValidatorsService,
    private usersService: UsersService
  ) {}

  @Output()
  onChangeModalVisibility:EventEmitter<boolean> = new EventEmitter<boolean>();

  private taskBody: TaskBody = {
    "title": 'Tarea 1',
    "description": 'Esta es la tarea 1',
    "expirationDate": new Date(),
    "state": TaskState.PENDING,
    "priority": TaskPriority.LOW
  };

  states = [
    { name: 'Pendiente', key: TaskState.PENDING },
    { name: 'En proceso', key: TaskState.PROCESSING },
    { name: 'Completado', key: TaskState.COMPLETED }
  ];

  priorities = [
    { name: 'Bajo', key: TaskPriority.LOW },
    { name: 'Medio', key: TaskPriority.MEDIUM },
    { name: 'Alto', key: TaskPriority.HIGH }
  ];

  minDate: Date = new Date();

  myForm: FormGroup = this.fb.group({
    title:          [ this.taskBody.title,          [Validators.required, Validators.minLength(3) ]],
    description:    [ this.taskBody.description,    [Validators.required, Validators.minLength(3) ]],
    expirationDate: [ this.taskBody.expirationDate, [Validators.required]],
    state:          [ this.taskBody.state,          [Validators.required]],
    priority:       [ this.taskBody.priority,       [Validators.required]],
  });

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const taskBodyReq: OneTaskBodyRequest = {
      "list_task_id": this.isParamId ? Number(this.paramService.getParamFromUrl('id', this.activeRoute)) : Number(this.listOfTasksDropdown.value.id),
      "task": {
        "title": this.myForm.controls['title'].value,
        "description": this.myForm.controls['description'].value,
        "expirationDate": this.myForm.controls['expirationDate'].value,
        "state": this.myForm.controls['state'].value.key,
        "priority": this.myForm.controls['priority'].value.key
      }
    };

    if(this.taskService.typeOfCrud === TypeCrudEnum.CREATE) {
      this.createTask(taskBodyReq);
    }
  }

  private createTask(taskBodyReq: OneTaskBodyRequest) {
    this.taskService.create(taskBodyReq)
      .subscribe({
        next: (task ): void => {

          Swal.fire({
            icon: 'success',
            title: 'Tarea creada',
            text: `La tarea ${task.title} se ha creado correctamente`
          });

          this.usersService.getUserWithListOfTasksAndTasks().subscribe();

          //1. Obtenemos la lista seleccionada/actual
          const list = this.listOfTasksService.listOfTasks.filter( list => list.id === taskBodyReq.list_task_id )[0];
          //2. Agregamos la tarea a las tareas de la lista
          this.taskService.tasks = [ task, ...list.tasks ];
          //3. Actualizamos las tareas de la lista
          list.tasks = [ ...this.taskService.tasks ];
          //4. Actualizamos la lista de listas
          this.listOfTasksService.listOfTasks = [ list, ...this.listOfTasksService.listOfTasks.filter( list => list.id !== taskBodyReq.list_task_id) ];

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

  cancelDialog(): void {
    this.myForm.reset();
    this.onChangeModalVisibility.emit(false);
  }

  ngOnInit(): void {
    const listTaskId = this.paramService.getParamFromUrl('id', this.activeRoute);

    this.isParamId = !!listTaskId;
    this.lists = listTaskId ? []: this.listOfTasksService.listOfTasks;

    this.myForm.controls['state'].setValue({ name: 'Pendiente', key: TaskState.PENDING });
    this.myForm.controls['priority'].setValue({ name: 'Bajo', key: TaskPriority.LOW });

  }
}
