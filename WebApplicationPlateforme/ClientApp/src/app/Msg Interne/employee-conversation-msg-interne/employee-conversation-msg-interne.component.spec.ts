import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeConversationMsgInterneComponent } from './employee-conversation-msg-interne.component';

describe('EmployeeConversationMsgInterneComponent', () => {
  let component: EmployeeConversationMsgInterneComponent;
  let fixture: ComponentFixture<EmployeeConversationMsgInterneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeConversationMsgInterneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeConversationMsgInterneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
