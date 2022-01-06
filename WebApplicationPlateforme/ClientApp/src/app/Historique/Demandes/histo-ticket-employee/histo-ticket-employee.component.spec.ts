import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoTicketEmployeeComponent } from './histo-ticket-employee.component';

describe('HistoTicketEmployeeComponent', () => {
  let component: HistoTicketEmployeeComponent;
  let fixture: ComponentFixture<HistoTicketEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoTicketEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoTicketEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
