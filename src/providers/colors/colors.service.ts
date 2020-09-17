import { Injectable } from '@angular/core';
import { take } from 'ramda';
import { RGBtoHSV, HSVtoRGB, RGBtoHex } from './../../util/color-transformations'

export type colorRgb = [number, number, number];

@Injectable({
  providedIn: 'root',
})
export class ColorsService {
  spacing = 16;

  constructor() {}

  public randomColor(): colorRgb {
    const color = () => Math.floor(Math.random() * 256);
    return [color(), color(), color()];
  }

    // generate using hsv
    public generateEvenWheel(size: number, primary = null): colorRgb[] {
      let hsv = primary ? RGBtoHSV(primary): RGBtoHSV(this.randomColor());
      let spacing = Math.floor(360/size);

      let generate = (i) => {
        let h = (hsv.h + spacing*i)%360
        return HSVtoRGB({
          ...hsv,
          h
        })
      }

      return Array(size)
        .fill(0)
        .map((_, i) => generate(i));
    }

    public generateShadesWheel(size: number, primary: colorRgb = null): colorRgb[] {
      let hsv = primary ? RGBtoHSV(primary): RGBtoHSV(this.randomColor());
      let spacing = 100/(size+1);

      let generate = (i) => {
        let v = spacing + spacing*i
        let color = { ...hsv, v };
        return HSVtoRGB(color)
      }

      return Array(size)
        .fill(0)
        .map((_, i) => {
          const value = generate(i);
          return value
        });
    }


    public generateTetradWheel(size: number, primary: colorRgb = null, setDeg = null): colorRgb[] {
      let hsv = primary ? RGBtoHSV(primary): RGBtoHSV(this.randomColor())
      let deg = setDeg || (Math.random() * 70) + 5
      let arr = []
      let arrOp = []
      let i = 0;
      while(arr.length + arrOp.length < size){
        let a = HSVtoRGB({...hsv, h: hsv.h + (deg*i)})
        let b = HSVtoRGB({...hsv, h: hsv.h + (deg*i) + 180})
        arr.push(a)
        arrOp.push(b)
        i++;
      }

      return take(size, [...arr, ...arrOp])
    }

    public generateAdjacentWheel(size: number, primary: colorRgb = null, setDeg = null): colorRgb[] {
      let hsv = primary ? RGBtoHSV(primary): RGBtoHSV(this.randomColor());
      let deg = setDeg || (Math.random() * 70) + 5

      let generate = (i) => {
        let h = deg*i
        let color = { ...hsv, h: hsv.h + h };
        return HSVtoRGB(color)
      }

      return Array(size)
        .fill(0)
        .map((_, i) => {
          const value = generate(i);
          return value
        });
    }
}
