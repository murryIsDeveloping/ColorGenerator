import { SharedModule } from './../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneratorComponent } from './generator/generator.component';
import { TileComponent } from './tile/tile.component';
import { PieComponent } from './pie/pie.component';
import { PaletteComponent } from './palette/palette.component';
import { RgbToHexPipe } from './pipes/rgb-to-hex.pipe';
import { ContrastTextColorPipe } from './pipes/contrast-text-color.pipe';
import { RgbToNamePipe } from './pipes/rgb-to-name.pipe';
import { FormsModule } from '@angular/forms';
import { ShadesPipe } from './pipes/shades.pipe';

const routes: Routes = [
  {
    path: '',
    component: GeneratorComponent,
  },
];

@NgModule({
  declarations: [
    GeneratorComponent,
    TileComponent,
    PieComponent,
    PaletteComponent,
    RgbToHexPipe,
    ContrastTextColorPipe,
    RgbToNamePipe,
    ShadesPipe,
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
})
export class GeneratorModule {}
