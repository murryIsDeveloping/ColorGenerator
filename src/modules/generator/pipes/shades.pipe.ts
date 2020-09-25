import { generateShadesWheel, colorRgb } from '@util/color-transformations';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shades'
})
export class ShadesPipe implements PipeTransform {

  transform(value: colorRgb, active: boolean, count: number = 7): colorRgb[] {
    if(active){
      return generateShadesWheel(count, value)
    } else {
      return [value]
    };
  }

}
