import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsRepairRequestListComponent } from './cars-repair-request-list.component';

describe('CarsRepairRequestListComponent', () => {
  let component: CarsRepairRequestListComponent;
  let fixture: ComponentFixture<CarsRepairRequestListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsRepairRequestListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsRepairRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
