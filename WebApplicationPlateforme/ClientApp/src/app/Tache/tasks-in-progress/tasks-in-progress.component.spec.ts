import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksInProgressComponent } from './tasks-in-progress.component';

describe('TasksInProgressComponent', () => {
  let component: TasksInProgressComponent;
  let fixture: ComponentFixture<TasksInProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksInProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksInProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
