import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import {RegisterComponent} from "./pages/register/register.component";
import {LoginComponent} from "./pages/login/login.component";
import {PrimeNgModule} from "../prime-ng/prime-ng.module";
import { LayoutComponent } from './pages/layout/layout.component';
import { AuthHeaderComponent } from './components/auth-header/auth-header.component';
import { ReactiveFormsModule } from "@angular/forms";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    LayoutComponent,
    AuthHeaderComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    PrimeNgModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AuthModule { }
