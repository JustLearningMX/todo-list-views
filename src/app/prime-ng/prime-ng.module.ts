import { NgModule } from '@angular/core';

import { MenuModule } from "primeng/menu";
import { ButtonModule } from "primeng/button";
import {ToolbarModule} from "primeng/toolbar";

@NgModule({
  declarations: [],
  exports: [
    MenuModule,
    ButtonModule,
    ToolbarModule
  ],
})
export class PrimeNgModule { }
