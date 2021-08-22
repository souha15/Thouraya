import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequePayListAcceptComponent } from './cheque-pay-list-accept.component';

describe('ChequePayListAcceptComponent', () => {
  let component: ChequePayListAcceptComponent;
  let fixture: ComponentFixture<ChequePayListAcceptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequePayListAcceptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequePayListAcceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
