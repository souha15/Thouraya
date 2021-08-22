import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksNotDoneComponent } from './tasks-not-done.component';

describe('TasksNotDoneComponent', () => {
  let component: TasksNotDoneComponent;
  let fixture: ComponentFixture<TasksNotDoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksNotDoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksNotDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
