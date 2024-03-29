import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutTasksComponent } from "./pages/layout-tasks/layout-tasks.component";
import { ListTasksComponent } from "./pages/list-tasks/list-tasks.component";
import { TasksComponent } from "./pages/tasks/tasks.component";

const routes: Routes = [
  { path: '', component: LayoutTasksComponent,
    data: { breadcrumb: 'mis listas' },
    children: [
      { path: 'listado', component: ListTasksComponent, data: { breadcrumb: null } },
      { path: 'listado/:id', component: TasksComponent, data: { breadcrumb: 'mis tareas' } },
      { path: '**', redirectTo: 'listado' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
