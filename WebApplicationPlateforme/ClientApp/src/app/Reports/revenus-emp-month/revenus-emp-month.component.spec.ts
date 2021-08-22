import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenusEmpMonthComponent } from './revenus-emp-month.component';

describe('RevenusEmpMonthComponent', () => {
  let component: RevenusEmpMonthComponent;
  let fixture: ComponentFixture<RevenusEmpMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevenusEmpMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenusEmpMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
