import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeActiviteeCompagneComponent } from './type-activitee-compagne.component';

describe('TypeActiviteeCompagneComponent', () => {
  let component: TypeActiviteeCompagneComponent;
  let fixture: ComponentFixture<TypeActiviteeCompagneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeActiviteeCompagneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeActiviteeCompagneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
