import { NgModule } from '@angular/core';

import { MenuModule } from "primeng/menu";
import { ButtonModule } from "primeng/button";
import {ToolbarModule} from "primeng/toolbar";
import {InputTextModule} from "primeng/inputtext";
import {SkeletonModule} from "primeng/skeleton";
import {DialogModule} from "primeng/dialog";

@NgModule({
  declarations: [],
  exports: [
    MenuModule,
    ButtonModule,
    ToolbarModule,
    InputTextModule,
    SkeletonModule,
    DialogModule
  ],
})
export class PrimeNgModule { }
