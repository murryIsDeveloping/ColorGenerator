import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberDialComponent } from './number-dial/number-dial.component';



@NgModule({
  declarations: [
    NumberDialComponent
  ],
  exports:[
    NumberDialComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
