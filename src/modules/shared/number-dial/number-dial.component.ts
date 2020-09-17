import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-number-dial',
  templateUrl: './number-dial.component.html',
  styleUrls: ['./number-dial.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NumberDialComponent),
    multi: true
  }]
})
export class NumberDialComponent implements ControlValueAccessor {
  @Input() max: number = 1000
  @Input() min: number = 0

  val;
  disabled = false;
  constructor() { }

  onChange: any = () => {}
  onTouch: any = () => {}

  set value(val){
    this.val = val
  }

  get value(): number {
    return this.val
  }

  updateValue(val: number) {
    if(val < 0) {
      this.writeValue(this.val > this.min ? this.val-1 : this.val)
    } else {
      this.writeValue(this.val < this.max ? this.val+1 : this.val)
    }
  }

  writeValue(value: number): void {
    this.value = value
    this.onChange(this.value)
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled
  }
}
