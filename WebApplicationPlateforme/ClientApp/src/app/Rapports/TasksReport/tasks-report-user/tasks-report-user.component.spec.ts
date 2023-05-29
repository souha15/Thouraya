import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksReportUserComponent } from './tasks-report-user.component';

describe('TasksReportUserComponent', () => {
  let component: TasksReportUserComponent;
  let fixture: ComponentFixture<TasksReportUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksReportUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksReportUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
