import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskEditAdminComponent } from './task-edit-admin.component';

describe('TaskEditAdminComponent', () => {
  let component: TaskEditAdminComponent;
  let fixture: ComponentFixture<TaskEditAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskEditAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskEditAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
