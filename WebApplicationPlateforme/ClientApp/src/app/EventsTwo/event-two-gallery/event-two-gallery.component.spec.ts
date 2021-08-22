import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTwoGalleryComponent } from './event-two-gallery.component';

describe('EventTwoGalleryComponent', () => {
  let component: EventTwoGalleryComponent;
  let fixture: ComponentFixture<EventTwoGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventTwoGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventTwoGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
