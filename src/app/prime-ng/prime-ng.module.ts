import { NgModule } from '@angular/core';

import { MenuModule } from "primeng/menu";
import { ButtonModule } from "primeng/button";
import {ToolbarModule} from "primeng/toolbar";
import {InputTextModule} from "primeng/inputtext";

@NgModule({
  declarations: [],
  exports: [
    MenuModule,
    ButtonModule,
    ToolbarModule,
    InputTextModule
  ],
})
export class PrimeNgModule { }
