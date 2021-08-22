import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenusPeriodComponent } from './revenus-period.component';

describe('RevenusPeriodComponent', () => {
  let component: RevenusPeriodComponent;
  let fixture: ComponentFixture<RevenusPeriodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevenusPeriodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenusPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
