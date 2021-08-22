import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketDirLisComponent } from './ticket-dir-lis.component';

describe('TicketDirLisComponent', () => {
  let component: TicketDirLisComponent;
  let fixture: ComponentFixture<TicketDirLisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketDirLisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketDirLisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
