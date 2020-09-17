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
  palleteSize: number = 7;
  palette: Observable<colorRgb[]> = this.EventService.keyUp.pipe(
    startWith("Space"),
    filter(x => x === "Space"),
    map(([_]) => {
      let val = Math.random();
      return val > 0.75 ? this.colorsService.generateAdjacentWheel(this.palleteSize):
      val > 0.50 ? this.colorsService.generateTetradWheel(this.palleteSize) :
      val > 0.25 ? this.colorsService.generateEvenWheel(this.palleteSize) :
      this.colorsService.generateShadesWheel(this.palleteSize)
    }),
  )

  constructor(
    private colorsService: ColorsService,
    private EventService: EventService
  ) {}


  change($event){
    console.log($event)
    this.palleteSize = $event
  }
}
