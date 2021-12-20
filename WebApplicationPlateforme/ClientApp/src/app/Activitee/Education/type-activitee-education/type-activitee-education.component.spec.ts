import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeActiviteeEducationComponent } from './type-activitee-education.component';

describe('TypeActiviteeEducationComponent', () => {
  let component: TypeActiviteeEducationComponent;
  let fixture: ComponentFixture<TypeActiviteeEducationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeActiviteeEducationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeActiviteeEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
