import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksReportsComponent } from './tasks-reports.component';

describe('TasksReportsComponent', () => {
  let component: TasksReportsComponent;
  let fixture: ComponentFixture<TasksReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
