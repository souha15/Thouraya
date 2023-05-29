import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintTasksReportDirComponent } from './print-tasks-report-dir.component';

describe('PrintTasksReportDirComponent', () => {
  let component: PrintTasksReportDirComponent;
  let fixture: ComponentFixture<PrintTasksReportDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintTasksReportDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintTasksReportDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
