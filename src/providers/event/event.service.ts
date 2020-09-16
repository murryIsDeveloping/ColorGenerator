import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class EventService {
  keyUp: Observable<String>;

  constructor() {
    this.keyUp = fromEvent(document, 'keyup').pipe(map((x: KeyboardEvent) => x.code))
   }

}
