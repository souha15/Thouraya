import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketListAgentComponent } from './ticket-list-agent.component';

describe('TicketListAgentComponent', () => {
  let component: TicketListAgentComponent;
  let fixture: ComponentFixture<TicketListAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketListAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketListAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
