import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintTasksReportUserComponent } from './print-tasks-report-user.component';

describe('PrintTasksReportUserComponent', () => {
  let component: PrintTasksReportUserComponent;
  let fixture: ComponentFixture<PrintTasksReportUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintTasksReportUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintTasksReportUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
