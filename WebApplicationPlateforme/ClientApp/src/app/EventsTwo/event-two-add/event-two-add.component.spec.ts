import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTwoAddComponent } from './event-two-add.component';

describe('EventTwoAddComponent', () => {
  let component: EventTwoAddComponent;
  let fixture: ComponentFixture<EventTwoAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventTwoAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventTwoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
