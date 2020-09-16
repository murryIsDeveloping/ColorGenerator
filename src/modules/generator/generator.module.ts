import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneratorComponent } from './generator/generator.component';
import { TileComponent } from './tile/tile.component';
import { PieComponent } from './pie/pie.component';
import { PaletteComponent } from './palette/palette.component';
import { RgbToHexPipe } from './pipes/rgb-to-hex.pipe';
import { RgbIsDarkPipe } from './pipes/rgb-is-dark.pipe';

const routes: Routes = [
  {
    path: "",
    component: GeneratorComponent
  },
];

@NgModule({
  declarations: [GeneratorComponent, TileComponent, PieComponent, PaletteComponent, RgbToHexPipe, RgbIsDarkPipe],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class GeneratorModule { }
