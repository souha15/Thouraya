import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaireReportPrintComponent } from './salaire-report-print.component';

describe('SalaireReportPrintComponent', () => {
  let component: SalaireReportPrintComponent;
  let fixture: ComponentFixture<SalaireReportPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaireReportPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaireReportPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
