import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsReportComponent } from './events-report.component';

describe('EventsReportComponent', () => {
  let component: EventsReportComponent;
  let fixture: ComponentFixture<EventsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
