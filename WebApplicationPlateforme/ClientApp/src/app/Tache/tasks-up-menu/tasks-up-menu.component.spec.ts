import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksUpMenuComponent } from './tasks-up-menu.component';

describe('TasksUpMenuComponent', () => {
  let component: TasksUpMenuComponent;
  let fixture: ComponentFixture<TasksUpMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksUpMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksUpMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
