import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTwoDetailComponent } from './event-two-detail.component';

describe('EventTwoDetailComponent', () => {
  let component: EventTwoDetailComponent;
  let fixture: ComponentFixture<EventTwoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventTwoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventTwoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
