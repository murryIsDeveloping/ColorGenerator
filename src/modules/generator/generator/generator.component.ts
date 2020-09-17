import { EventService } from './../../../providers/event/event.service';
import {
  ColorsService,
  colorRgb,
} from './../../../providers/colors/colors.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, startWith, tap, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss'],
})
export class GeneratorComponent {
  palleteSize: BehaviorSubject<number> = new BehaviorSubject(5);
  pallete: Observable<colorRgb[]> = this.EventService.keyUp.pipe(
    startWith("Space"),
    filter(x => x === "Space"),
    withLatestFrom(this.palleteSize),
    map(([_, size]) => {
      let val = Math.random();
      return val > 0.75 ? this.colorsService.generateAdjacentWheel(size):
      val > 0.50 ? this.colorsService.generateTetradWheel(size) :
      val > 0.25 ? this.colorsService.generateEvenWheel(size) :
      this.colorsService.generateShadesWheel(size)
    }),
  )

  constructor(
    private colorsService: ColorsService,
    private EventService: EventService
  ) {}

}
