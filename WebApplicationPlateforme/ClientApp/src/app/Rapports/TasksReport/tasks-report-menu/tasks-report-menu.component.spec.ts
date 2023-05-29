import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksReportMenuComponent } from './tasks-report-menu.component';

describe('TasksReportMenuComponent', () => {
  let component: TasksReportMenuComponent;
  let fixture: ComponentFixture<TasksReportMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksReportMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksReportMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
