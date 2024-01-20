import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import {RegisterComponent} from "./pages/register/register.component";
import {LoginComponent} from "./pages/login/login.component";
import {PrimeNgModule} from "../prime-ng/prime-ng.module";
import { LayoutComponent } from './pages/layout/layout.component';


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    PrimeNgModule
  ]
})
export class AuthModule { }
