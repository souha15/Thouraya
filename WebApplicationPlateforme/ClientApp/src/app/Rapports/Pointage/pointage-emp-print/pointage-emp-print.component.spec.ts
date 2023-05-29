import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointageEmpPrintComponent } from './pointage-emp-print.component';

describe('PointageEmpPrintComponent', () => {
  let component: PointageEmpPrintComponent;
  let fixture: ComponentFixture<PointageEmpPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointageEmpPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointageEmpPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
