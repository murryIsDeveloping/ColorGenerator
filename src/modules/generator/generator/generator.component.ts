import { EventService } from './../../../providers/event/event.service';
import {
  ColorsService,
  colorRgb,
} from './../../../providers/colors/colors.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, startWith, withLatestFrom } from 'rxjs/operators';

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
    map(([_, size]) => this.colorsService.generateOppositeWheel(size))
  )

  constructor(
    private colorsService: ColorsService,
    private EventService: EventService
  ) {}

}
