import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ecommers } from './ecommers';

describe('Ecommers', () => {
  let component: Ecommers;
  let fixture: ComponentFixture<Ecommers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ecommers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ecommers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
