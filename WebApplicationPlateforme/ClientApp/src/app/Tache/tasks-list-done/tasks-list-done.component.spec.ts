import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksListDoneComponent } from './tasks-list-done.component';

describe('TasksListDoneComponent', () => {
  let component: TasksListDoneComponent;
  let fixture: ComponentFixture<TasksListDoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksListDoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksListDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
