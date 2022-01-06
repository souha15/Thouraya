import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoPayChequeComponent } from './histo-pay-cheque.component';

describe('HistoPayChequeComponent', () => {
  let component: HistoPayChequeComponent;
  let fixture: ComponentFixture<HistoPayChequeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoPayChequeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoPayChequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
