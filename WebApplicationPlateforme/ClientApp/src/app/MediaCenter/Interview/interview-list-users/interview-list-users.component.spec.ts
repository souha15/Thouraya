import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewListUsersComponent } from './interview-list-users.component';

describe('InterviewListUsersComponent', () => {
  let component: InterviewListUsersComponent;
  let fixture: ComponentFixture<InterviewListUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewListUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewListUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
