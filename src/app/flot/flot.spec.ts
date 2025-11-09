import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Flot } from './flot';

describe('Flot', () => {
  let component: Flot;
  let fixture: ComponentFixture<Flot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Flot]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Flot);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
