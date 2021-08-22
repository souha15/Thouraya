import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListAdminComponent } from './task-list-admin.component';

describe('TaskListAdminComponent', () => {
  let component: TaskListAdminComponent;
  let fixture: ComponentFixture<TaskListAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskListAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
