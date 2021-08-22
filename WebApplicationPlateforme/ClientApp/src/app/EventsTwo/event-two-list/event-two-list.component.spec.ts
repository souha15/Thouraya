import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTwoListComponent } from './event-two-list.component';

describe('EventTwoListComponent', () => {
  let component: EventTwoListComponent;
  let fixture: ComponentFixture<EventTwoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventTwoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventTwoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
