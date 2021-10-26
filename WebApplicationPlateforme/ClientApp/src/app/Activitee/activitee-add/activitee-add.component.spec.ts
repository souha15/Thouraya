import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviteeAddComponent } from './activitee-add.component';

describe('ActiviteeAddComponent', () => {
  let component: ActiviteeAddComponent;
  let fixture: ComponentFixture<ActiviteeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiviteeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiviteeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
