import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviteDawaElecListComponent } from './activite-dawa-elec-list.component';

describe('ActiviteDawaElecListComponent', () => {
  let component: ActiviteDawaElecListComponent;
  let fixture: ComponentFixture<ActiviteDawaElecListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiviteDawaElecListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiviteDawaElecListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
