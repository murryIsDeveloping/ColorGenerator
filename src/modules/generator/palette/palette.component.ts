import { colorRgb } from '@util/color-transformations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-palette',
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.scss']
})
export class PaletteComponent {
  @Input('palette') palette: colorRgb[]
}
