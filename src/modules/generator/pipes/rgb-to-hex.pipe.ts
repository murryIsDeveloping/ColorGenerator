import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rgbToHex'
})
export class RgbToHexPipe implements PipeTransform {

  transform(RGB: [number,number, number], ...args: unknown[]): unknown {
    if(Array.isArray(RGB)){
      return "#" + this.compToHex(RGB[0]) + this.compToHex(RGB[1]) + this.compToHex(RGB[2]);
    }
  }

  private compToHex(c){
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
}
