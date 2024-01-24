import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Error404Component} from "./shared/pages/error404/error404.component";
import {LandingPageComponent} from "./shared/pages/landing-page/landing-page.component";
import {authPrivateGuard} from "./auth/guards/auth-private.guard";
import {authPublicGuard} from "./auth/guards/auth-public.guard";

const routes: Routes = [
  {
    path: 'inicio', component: LandingPageComponent,
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((m) => m.AuthModule),
    canMatch: [authPublicGuard],
  },
  {
    path: 'mis-listas',
    loadChildren: () =>
      import('./tasks/tasks.module').then((m) => m.TasksModule),
    canMatch: [authPrivateGuard],
  },
  {
    path: '404',
    component: Error404Component,
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '404',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
