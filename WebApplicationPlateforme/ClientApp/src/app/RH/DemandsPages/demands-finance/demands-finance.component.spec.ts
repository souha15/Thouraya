import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandsFinanceComponent } from './demands-finance.component';

describe('DemandsFinanceComponent', () => {
  let component: DemandsFinanceComponent;
  let fixture: ComponentFixture<DemandsFinanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandsFinanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandsFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
