import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewMenuUsersComponent } from './interview-menu-users.component';

describe('InterviewMenuUsersComponent', () => {
  let component: InterviewMenuUsersComponent;
  let fixture: ComponentFixture<InterviewMenuUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewMenuUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewMenuUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
