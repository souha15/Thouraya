import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenusMonthComponent } from './revenus-month.component';

describe('RevenusMonthComponent', () => {
  let component: RevenusMonthComponent;
  let fixture: ComponentFixture<RevenusMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevenusMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenusMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
