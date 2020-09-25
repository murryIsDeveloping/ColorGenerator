import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TileComponent implements OnInit {
  @Input('color') color: [number, number, number];

  active = false;
  size = 5;
  min = 1;
  max = 10;
  constructor() { }

  ngOnInit(): void {
  }

  toggleActive(){
    this.active = !this.active;
  }
}
