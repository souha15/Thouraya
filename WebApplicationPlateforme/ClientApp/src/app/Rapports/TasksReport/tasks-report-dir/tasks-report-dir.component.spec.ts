import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksReportDirComponent } from './tasks-report-dir.component';

describe('TasksReportDirComponent', () => {
  let component: TasksReportDirComponent;
  let fixture: ComponentFixture<TasksReportDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksReportDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksReportDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
