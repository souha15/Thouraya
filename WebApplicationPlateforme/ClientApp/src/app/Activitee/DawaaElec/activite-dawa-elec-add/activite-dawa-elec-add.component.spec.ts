import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviteDawaElecAddComponent } from './activite-dawa-elec-add.component';

describe('ActiviteDawaElecAddComponent', () => {
  let component: ActiviteDawaElecAddComponent;
  let fixture: ComponentFixture<ActiviteDawaElecAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiviteDawaElecAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiviteDawaElecAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
