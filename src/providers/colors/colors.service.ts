import { Injectable } from '@angular/core';

export type colorRgb = [number, number, number]


@Injectable({
  providedIn: 'root'
})
export class ColorsService {
  constructor() { }

  public randomColor(): colorRgb {
    const color = () => Math.floor(Math.random() * 256)
    return [color(), color(), color()]
  }

  public generateEvenWheel(size: number): colorRgb[] {
    let primary = this.randomColor();
    let spacing = Math.floor(256/size)
    let generate = (num, i) => (num + (spacing*i)) % 256
    return Array(size).fill(0).map((_,i) => [generate(primary[0], i), generate(primary[1], i), generate(primary[2], i)])
  }
}
