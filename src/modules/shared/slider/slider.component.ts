import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild, Input, forwardRef, AfterViewInit } from '@angular/core';
import { Observable, fromEvent, merge } from 'rxjs';
import { throttleTime, map, filter, pluck, tap, scan, startWith, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SliderComponent),
    multi: true
  }]
})
export class SliderComponent implements ControlValueAccessor {
  @Input('min') min: number;
  @Input('max') max: number;

  @ViewChild('track', {static: true}) track: ElementRef;
  @ViewChild('tracker', {static: true}) tracker: ElementRef;

  resizeObservable$: Observable<any>;
  drag$: Observable<any>;
  active$: Observable<boolean>;
  show = false;

  height: number;
  offset: number;
  init = false;

  val: number;

  onChange: any = () => {};
  onTouch: any = () => {};

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) { }

  initValues(){
    this.init = true;
    this.height = this.track.nativeElement.offsetHeight;
    let maxHeight = this.height-15;
    let dif = this.max - this.min;
    let stepHeight = maxHeight/dif;
    let startVal = (stepHeight*this.val)-(stepHeight/2)

    const hammerPan = new Hammer(this.tracker.nativeElement)
    hammerPan.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL });

    const pan: Observable<any> = fromEvent(hammerPan, 'panstart panmove panend')

    this.active$ = pan.pipe(
      pluck('type'),
      filter(x => x === 'panend' || x === 'panstart'),
      map(x => x == 'panstart' ? true : false),
      startWith(false),
      tap(x => {
        this.document.body.style.cursor = x ? 'grabbing' : 'default'
      })
    )

    const dragEnd = pan.pipe(
      filter(x => x.type === 'panend'),
      pluck('deltaY'),
      startWith(startVal),
      scan((acc,x) => {
        let val = acc + x
        return val < 0 ? 0 : val >= maxHeight ? maxHeight : val
      }, 0)
    )

    const dragging = pan.pipe(
      throttleTime(10),
      filter((x: any) => x.type === 'panmove'),
      withLatestFrom(dragEnd),
      map(([x, offset]) => {
        let val = offset + x.deltaY
        return val < 0 ? 0 : val >= maxHeight ? maxHeight : val
      }),
    )

    this.drag$ = merge(dragging, dragEnd).pipe(
      tap(x => {
        let val = Math.floor(x/stepHeight) + this.min
        this.writeValue(val)
      })
    )
  }

  showTrack(val: boolean){
    this.show = val
  }

  writeValue(value: number): void {
    if(value !== null){
      this.val = value > this.max ? this.max : value < this.min ? this.min : value;
      this.onChange(this.val)

      if(!this.init){
        this.initValues()
      }
    }
  }

  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn
  }

}
