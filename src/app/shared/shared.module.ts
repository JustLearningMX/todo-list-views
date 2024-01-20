import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

import {PrimeNgModule} from "../prime-ng/prime-ng.module";
import { Error404Component } from './pages/error404/error404.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

@NgModule({
  declarations: [
    Error404Component,
    LandingPageComponent
  ],
  exports: [

  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    RouterLink
  ]
})
export class SharedModule { }
