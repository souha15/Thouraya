import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviteeDetailComponent } from './activitee-detail.component';

describe('ActiviteeDetailComponent', () => {
  let component: ActiviteeDetailComponent;
  let fixture: ComponentFixture<ActiviteeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiviteeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiviteeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
