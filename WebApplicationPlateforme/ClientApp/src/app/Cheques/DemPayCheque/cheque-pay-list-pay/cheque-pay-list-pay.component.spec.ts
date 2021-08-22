import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequePayListPayComponent } from './cheque-pay-list-pay.component';

describe('ChequePayListPayComponent', () => {
  let component: ChequePayListPayComponent;
  let fixture: ComponentFixture<ChequePayListPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequePayListPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequePayListPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
