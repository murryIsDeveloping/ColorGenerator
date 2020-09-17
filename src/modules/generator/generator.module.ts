import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneratorComponent } from './generator/generator.component';
import { TileComponent } from './tile/tile.component';
import { PieComponent } from './pie/pie.component';
import { PaletteComponent } from './palette/palette.component';
import { RgbToHexPipe } from './pipes/rgb-to-hex.pipe';
import { ContrastTextColorPipe } from './pipes/contrast-text-color.pipe';

const routes: Routes = [
  {
    path: "",
    component: GeneratorComponent
  },
];

@NgModule({
  declarations: [GeneratorComponent, TileComponent, PieComponent, PaletteComponent, RgbToHexPipe , ContrastTextColorPipe],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class GeneratorModule { }
