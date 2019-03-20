import { NgModule } from '@angular/core';

import { CommonModule } from "@angular/common";

const MYMODULES = [];

@NgModule({
  imports: [
    CommonModule,
    ...MYMODULES
  ],
  exports:[...MYMODULES]
})

export class MyModuleModule {

}
