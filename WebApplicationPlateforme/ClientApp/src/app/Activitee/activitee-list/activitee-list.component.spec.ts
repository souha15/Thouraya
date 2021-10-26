import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviteeListComponent } from './activitee-list.component';

describe('ActiviteeListComponent', () => {
  let component: ActiviteeListComponent;
  let fixture: ComponentFixture<ActiviteeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiviteeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiviteeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
