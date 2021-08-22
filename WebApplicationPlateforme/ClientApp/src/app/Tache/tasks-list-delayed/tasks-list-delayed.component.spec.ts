import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksListDelayedComponent } from './tasks-list-delayed.component';

describe('TasksListDelayedComponent', () => {
  let component: TasksListDelayedComponent;
  let fixture: ComponentFixture<TasksListDelayedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksListDelayedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksListDelayedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
