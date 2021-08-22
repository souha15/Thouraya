import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenusEmpDateMonthComponent } from './revenus-emp-date-month.component';

describe('RevenusEmpDateMonthComponent', () => {
  let component: RevenusEmpDateMonthComponent;
  let fixture: ComponentFixture<RevenusEmpDateMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevenusEmpDateMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenusEmpDateMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
