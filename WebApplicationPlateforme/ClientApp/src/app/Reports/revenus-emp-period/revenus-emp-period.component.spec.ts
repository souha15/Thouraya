import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenusEmpPeriodComponent } from './revenus-emp-period.component';

describe('RevenusEmpPeriodComponent', () => {
  let component: RevenusEmpPeriodComponent;
  let fixture: ComponentFixture<RevenusEmpPeriodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevenusEmpPeriodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenusEmpPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
