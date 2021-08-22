import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketListClientComponent } from './ticket-list-client.component';

describe('TicketListClientComponent', () => {
  let component: TicketListClientComponent;
  let fixture: ComponentFixture<TicketListClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketListClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketListClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
