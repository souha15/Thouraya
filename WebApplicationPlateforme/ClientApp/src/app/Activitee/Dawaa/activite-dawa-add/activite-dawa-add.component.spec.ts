import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviteDawaAddComponent } from './activite-dawa-add.component';

describe('ActiviteDawaAddComponent', () => {
  let component: ActiviteDawaAddComponent;
  let fixture: ComponentFixture<ActiviteDawaAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiviteDawaAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiviteDawaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
