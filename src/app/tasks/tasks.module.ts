import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { PrimeNgModule } from "../prime-ng/prime-ng.module";
import { LayoutTasksComponent } from './pages/layout-tasks/layout-tasks.component';
import { ListTasksComponent } from './pages/list-tasks/list-tasks.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { SharedModule } from "../shared/shared.module";
import { TasksHeaderComponent } from './components/tasks-header/tasks-header.component';
import { WelcomeUserComponent } from './components/welcome-user/welcome-user.component';
import { ListSkeletonComponent } from './components/list-skeleton/list-skeleton.component';
import { ModalAddListComponent } from './components/modal-add-list/modal-add-list.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ListGridComponent } from './components/list-grid/list-grid.component';
import { ListCardComponent } from './components/list-card/list-card.component';
import { ModalDeleteListComponent } from './components/modal-delete-list/modal-delete-list.component';
import { ModalEditListComponent } from './components/modal-edit-list/modal-edit-list.component';
import { FormListTasksComponent } from './components/form-list-tasks/form-list-tasks.component';
import { TasksGridComponent } from './components/tasks-grid/tasks-grid.component';
import { ModalAddTaskComponent } from './components/modal-add-task/modal-add-task.component';
import { FormTasksComponent } from './components/form-tasks/form-tasks.component';
import { TaskCardComponent } from './components/task-card/task-card.component';


@NgModule({
  declarations: [
    LayoutTasksComponent,
    ListTasksComponent,
    TasksComponent,
    TasksHeaderComponent,
    WelcomeUserComponent,
    ListSkeletonComponent,
    ModalAddListComponent,
    ListGridComponent,
    ListCardComponent,
    ModalDeleteListComponent,
    ModalEditListComponent,
    FormListTasksComponent,
    TasksGridComponent,
    ModalAddTaskComponent,
    FormTasksComponent,
    TaskCardComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    PrimeNgModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class TasksModule { }
