import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberDialComponent } from './number-dial/number-dial.component';
import { SliderComponent } from './slider/slider.component';
import { HammerModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    NumberDialComponent,
    SliderComponent
  ],
  exports:[
    SliderComponent,
    NumberDialComponent
  ],
  imports: [
    CommonModule,
    HammerModule
  ]
})
export class SharedModule { }
