import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketDetailClientComponent } from './ticket-detail-client.component';

describe('TicketDetailClientComponent', () => {
  let component: TicketDetailClientComponent;
  let fixture: ComponentFixture<TicketDetailClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketDetailClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketDetailClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
