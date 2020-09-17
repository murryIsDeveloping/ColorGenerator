import { colorRgb } from '@util/color-transformations';
import { ColorsService } from '@providers/colors/colors.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss'],
})
export class GeneratorComponent {
  palleteSize: BehaviorSubject<number>;
  palette: Observable<colorRgb[]>;

  constructor(
    colorsService: ColorsService,
  ) {
    this.palleteSize = colorsService.palleteSize;
    this.palette = colorsService.palette;
  }

}
