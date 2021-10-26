import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviteeEditComponent } from './activitee-edit.component';

describe('ActiviteeEditComponent', () => {
  let component: ActiviteeEditComponent;
  let fixture: ComponentFixture<ActiviteeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiviteeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiviteeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
