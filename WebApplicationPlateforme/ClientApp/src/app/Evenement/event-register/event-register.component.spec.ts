import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRegisterComponent } from './event-register.component';

describe('EventRegisterComponent', () => {
  let component: EventRegisterComponent;
  let fixture: ComponentFixture<EventRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
