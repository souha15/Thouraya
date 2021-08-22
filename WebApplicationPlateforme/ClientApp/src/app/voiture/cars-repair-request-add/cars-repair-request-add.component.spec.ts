import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsRepairRequestAddComponent } from './cars-repair-request-add.component';

describe('CarsRepairRequestAddComponent', () => {
  let component: CarsRepairRequestAddComponent;
  let fixture: ComponentFixture<CarsRepairRequestAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsRepairRequestAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsRepairRequestAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
