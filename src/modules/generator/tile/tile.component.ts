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
  constructor() { }

  ngOnInit(): void {
  }

  toggleActive(){
    console.log('active', this.active)
    this.active = !this.active;
  }
}
