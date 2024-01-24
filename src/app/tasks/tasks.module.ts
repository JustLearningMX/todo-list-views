import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { PrimeNgModule } from "../prime-ng/prime-ng.module";
import { LayoutTasksComponent } from './pages/layout-tasks/layout-tasks.component';
import { ListTasksComponent } from './pages/list-tasks/list-tasks.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { SharedModule } from "../shared/shared.module";


@NgModule({
  declarations: [
    LayoutTasksComponent,
    ListTasksComponent,
    TasksComponent
  ],
    imports: [
        CommonModule,
        TasksRoutingModule,
        PrimeNgModule,
        SharedModule,
    ]
})
export class TasksModule { }
