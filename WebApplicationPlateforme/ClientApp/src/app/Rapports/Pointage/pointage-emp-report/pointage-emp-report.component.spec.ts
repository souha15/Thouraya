import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointageEmpReportComponent } from './pointage-emp-report.component';

describe('PointageEmpReportComponent', () => {
  let component: PointageEmpReportComponent;
  let fixture: ComponentFixture<PointageEmpReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointageEmpReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointageEmpReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
