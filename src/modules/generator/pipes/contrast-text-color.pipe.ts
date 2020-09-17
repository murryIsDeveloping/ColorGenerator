import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contrastTextColor'
})
export class ContrastTextColorPipe implements PipeTransform {

  transform(value: [number, number, number], ...args: unknown[]): string {
    let total = value.reduce((acc, x) => x + acc, 0)
    return value.every(n => n > 150) || total > 500  ? '#000000' : '#ffffff '
  }

}
