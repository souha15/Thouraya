import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviteeRapDawaaHommeComponent } from './activitee-rap-dawaa-homme.component';

describe('ActiviteeRapDawaaHommeComponent', () => {
  let component: ActiviteeRapDawaaHommeComponent;
  let fixture: ComponentFixture<ActiviteeRapDawaaHommeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiviteeRapDawaaHommeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiviteeRapDawaaHommeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
