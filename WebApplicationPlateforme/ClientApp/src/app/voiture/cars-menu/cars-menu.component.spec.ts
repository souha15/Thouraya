import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsMenuComponent } from './cars-menu.component';

describe('CarsMenuComponent', () => {
  let component: CarsMenuComponent;
  let fixture: ComponentFixture<CarsMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
