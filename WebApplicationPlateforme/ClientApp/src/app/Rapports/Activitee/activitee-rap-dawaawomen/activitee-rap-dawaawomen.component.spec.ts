import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviteeRapDawaawomenComponent } from './activitee-rap-dawaawomen.component';

describe('ActiviteeRapDawaawomenComponent', () => {
  let component: ActiviteeRapDawaawomenComponent;
  let fixture: ComponentFixture<ActiviteeRapDawaawomenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiviteeRapDawaawomenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiviteeRapDawaawomenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
