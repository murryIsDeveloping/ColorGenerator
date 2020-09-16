import { Injectable } from '@angular/core';
import { splitEvery, map } from 'ramda'

export type colorRgb = {r: number, g: number, b: number};

@Injectable({
  providedIn: 'root'
})
export class ColorsService {
  constructor() { }

  public hexToRGB(hex: string): colorRgb {
    const [r, g, b] = splitEvery(2, hex.substring(1)).map(v => parseInt(v, 16))
    return {r, g, b}
  }

  private compToHex(c){
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  public RGBToHex(RGB: colorRgb): string {
    return "#" + this.compToHex(RGB.r) + this.compToHex(RGB.g) + this.compToHex(RGB.b);
  }
}
