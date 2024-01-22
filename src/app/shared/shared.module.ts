import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { RouterLink } from "@angular/router";

import {PrimeNgModule} from "../prime-ng/prime-ng.module";
import { Error404Component } from './pages/error404/error404.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    Error404Component,
    LandingPageComponent,
    FooterComponent
  ],
  exports: [
    FooterComponent

  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    RouterLink,
    NgOptimizedImage
  ]
})
export class SharedModule { }
