import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketMyLisComponent } from './ticket-my-lis.component';

describe('TicketMyLisComponent', () => {
  let component: TicketMyLisComponent;
  let fixture: ComponentFixture<TicketMyLisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketMyLisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketMyLisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
