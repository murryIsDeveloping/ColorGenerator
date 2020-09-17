import { Pipe, PipeTransform } from '@angular/core';
import { RGBtoHex, colorRgb } from '@util/color-transformations';
import { name } from 'ntc';

@Pipe({
  name: 'rgbToName'
})
export class RgbToNamePipe implements PipeTransform {

  transform(value: colorRgb, ...args: unknown[]): string {
    return name(RGBtoHex(value))[1];
  }

}
