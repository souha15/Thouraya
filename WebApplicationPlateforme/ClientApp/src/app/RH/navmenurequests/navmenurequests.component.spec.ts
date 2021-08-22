import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavmenurequestsComponent } from './navmenurequests.component';

describe('NavmenurequestsComponent', () => {
  let component: NavmenurequestsComponent;
  let fixture: ComponentFixture<NavmenurequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavmenurequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavmenurequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
