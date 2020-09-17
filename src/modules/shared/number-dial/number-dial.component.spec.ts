import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberDialComponent } from './number-dial.component';

describe('NumberDialComponent', () => {
  let component: NumberDialComponent;
  let fixture: ComponentFixture<NumberDialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberDialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberDialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
