import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksListReceivedComponent } from './tasks-list-received.component';

describe('TasksListReceivedComponent', () => {
  let component: TasksListReceivedComponent;
  let fixture: ComponentFixture<TasksListReceivedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksListReceivedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksListReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
