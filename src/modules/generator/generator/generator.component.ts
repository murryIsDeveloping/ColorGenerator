import { ColorsService } from './../../../providers/colors/colors.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit {

  constructor(
    private colorsService: ColorsService
  ) { }

  ngOnInit(): void {
    console.log(this.colorsService.RGBToHex({r: 8, g: 100, b: 212}))
  }

}
