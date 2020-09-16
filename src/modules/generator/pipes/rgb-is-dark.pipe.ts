import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rgbIsDark'
})
export class RgbIsDarkPipe implements PipeTransform {

  transform(value: [number, number, number], ...args: unknown[]): unknown {
    return value.reduce((sum, val) => val + sum, 0) < 385;
  }

}
