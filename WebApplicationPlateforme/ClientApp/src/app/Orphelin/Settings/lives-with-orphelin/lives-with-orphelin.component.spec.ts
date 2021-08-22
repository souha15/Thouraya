import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivesWithOrphelinComponent } from './lives-with-orphelin.component';

describe('LivesWithOrphelinComponent', () => {
  let component: LivesWithOrphelinComponent;
  let fixture: ComponentFixture<LivesWithOrphelinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivesWithOrphelinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivesWithOrphelinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
