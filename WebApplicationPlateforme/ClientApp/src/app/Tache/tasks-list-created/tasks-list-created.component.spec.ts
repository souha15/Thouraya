import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksListCreatedComponent } from './tasks-list-created.component';

describe('TasksListCreatedComponent', () => {
  let component: TasksListCreatedComponent;
  let fixture: ComponentFixture<TasksListCreatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksListCreatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksListCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
