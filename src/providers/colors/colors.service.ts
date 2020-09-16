import { Injectable } from '@angular/core';
import { take } from 'ramda';

export type colorRgb = [number, number, number]


@Injectable({
  providedIn: 'root'
})
export class ColorsService {
  spacing = 25;

  constructor() { }

  public randomColor(): colorRgb {
    const color = () => Math.floor(Math.random() * 256)
    return [color(), color(), color()]
  }

  public generateEvenWheel(size: number, primary = null): colorRgb[] {
    if(!primary){
      primary = this.randomColor();
    }

    let spacing = Math.floor(256/size)
    let generate = (num, i) => (num + (spacing*i)) % 256
    return Array(size).fill(0).map((_,i) => [generate(primary[0], i), generate(primary[1], i), generate(primary[2], i)])
  }

  public generateShadesWheel(size: number, primary = null): colorRgb[] {
    if(!primary){
      primary = this.randomColor();
    }
    let generate = (num, i) => {
      let value = (num + (this.spacing*i))%256
      return value <= 0 ? 256+value : value
    }
    let arr: colorRgb[] = [primary]
    let i = 1;

    while(arr.length < size){
      arr.push(
        [generate(primary[0], i), generate(primary[1], i), generate(primary[2], i)],
        [generate(primary[0], -i), generate(primary[1], -i), generate(primary[2], -i)]
      )
      i++;
    }
    return take(size, arr);
  }

  private generateOpposite(color: colorRgb): colorRgb {
    let half = 256/2
    let opp = value => (value + half)%256
    return [opp(color[0]), opp(color[1]), opp(color[2])]
  }

  public generateOppositeWheel(size: number, primary = null): colorRgb[] {
    if(!primary){
      primary = this.randomColor();
    }

    let opp = this.generateOpposite(primary)
    let shades = this.generateShadesWheel(size, opp)
    shades[0] = primary
    return shades;
  }
}
