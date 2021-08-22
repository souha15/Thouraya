import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsrhComponent } from './alertsrh.component';

describe('AlertsrhComponent', () => {
  let component: AlertsrhComponent;
  let fixture: ComponentFixture<AlertsrhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertsrhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsrhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
