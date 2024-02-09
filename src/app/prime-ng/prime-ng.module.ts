import { NgModule } from '@angular/core';

import { MenuModule } from "primeng/menu";
import { ButtonModule } from "primeng/button";
import {ToolbarModule} from "primeng/toolbar";
import {InputTextModule} from "primeng/inputtext";
import {SkeletonModule} from "primeng/skeleton";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {CalendarModule} from "primeng/calendar";

@NgModule({
  declarations: [],
  exports: [
    MenuModule,
    ButtonModule,
    ToolbarModule,
    InputTextModule,
    SkeletonModule,
    DialogModule,
    DropdownModule,
    CalendarModule
  ],
})
export class PrimeNgModule { }
