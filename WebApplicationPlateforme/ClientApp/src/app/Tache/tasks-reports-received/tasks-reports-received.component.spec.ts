import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksReportsReceivedComponent } from './tasks-reports-received.component';

describe('TasksReportsReceivedComponent', () => {
  let component: TasksReportsReceivedComponent;
  let fixture: ComponentFixture<TasksReportsReceivedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksReportsReceivedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksReportsReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
