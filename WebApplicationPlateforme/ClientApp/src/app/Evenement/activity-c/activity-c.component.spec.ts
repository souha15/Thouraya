import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCComponent } from './activity-c.component';

describe('ActivityCComponent', () => {
  let component: ActivityCComponent;
  let fixture: ComponentFixture<ActivityCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
