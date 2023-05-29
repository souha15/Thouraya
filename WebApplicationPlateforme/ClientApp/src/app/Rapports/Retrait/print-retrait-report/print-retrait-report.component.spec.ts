import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintRetraitReportComponent } from './print-retrait-report.component';

describe('PrintRetraitReportComponent', () => {
  let component: PrintRetraitReportComponent;
  let fixture: ComponentFixture<PrintRetraitReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintRetraitReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintRetraitReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
