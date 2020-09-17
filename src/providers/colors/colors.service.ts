import { startWith, filter, withLatestFrom, map } from 'rxjs/operators';
import { EventService } from './../event/event.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { colorRgb, generateAdjacentWheel, generateEvenWheel, generateShadesWheel, generateTetradWheel } from '@util/color-transformations';

@Injectable({
  providedIn: 'root',
})
export class ColorsService {
  constructor(
    private es: EventService
  ) {}

  palleteSize: BehaviorSubject<number> = new BehaviorSubject(7);
  palette: Observable<colorRgb[]> = this.es.keyUp.pipe(
    startWith("Space"),
    filter(x => x === "Space"),
    withLatestFrom(this.palleteSize),
    map(([_, size]) => {
      let val = Math.random();
      return val > 0.75 ? generateAdjacentWheel(size):
      val > 0.50 ? generateTetradWheel(size) :
      val > 0.25 ? generateEvenWheel(size) :
      generateShadesWheel(size)
    }),
  )
}
