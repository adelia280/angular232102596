import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartJS } from './chart-js';

describe('ChartJS', () => {
  let component: ChartJS;
  let fixture: ComponentFixture<ChartJS>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartJS]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartJS);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
