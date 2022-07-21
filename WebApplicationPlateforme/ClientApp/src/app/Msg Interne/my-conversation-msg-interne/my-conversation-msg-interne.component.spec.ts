import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyConversationMsgInterneComponent } from './my-conversation-msg-interne.component';

describe('MyConversationMsgInterneComponent', () => {
  let component: MyConversationMsgInterneComponent;
  let fixture: ComponentFixture<MyConversationMsgInterneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyConversationMsgInterneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyConversationMsgInterneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
