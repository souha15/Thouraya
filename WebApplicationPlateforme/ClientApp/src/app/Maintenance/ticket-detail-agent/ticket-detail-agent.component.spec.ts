import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketDetailAgentComponent } from './ticket-detail-agent.component';

describe('TicketDetailAgentComponent', () => {
  let component: TicketDetailAgentComponent;
  let fixture: ComponentFixture<TicketDetailAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketDetailAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketDetailAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
