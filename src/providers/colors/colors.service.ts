import { startWith, filter, map } from 'rxjs/operators';
import { EventService } from './../event/event.service';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { colorRgb, generateAdjacentWheel, generateEvenWheel, generateTetradWheel } from '@util/color-transformations';

@Injectable({
  providedIn: 'root',
})
export class ColorsService {
  constructor(
    private es: EventService
  ) {}

  palleteSize: BehaviorSubject<number> = new BehaviorSubject(5);
  space: Observable<string | String> = this.es.keyUp.pipe(
    startWith("Space"),
    filter(x => x === "Space")
  )
  palette: Observable<colorRgb[]> = combineLatest(this.space, this.palleteSize).pipe(
    map(([_, size]) => {
      let val = Math.random();
      return val > 0.66 ? generateAdjacentWheel(size):
      val > 0.33 ? generateTetradWheel(size) :
      generateEvenWheel(size)
    }),
  )
}
