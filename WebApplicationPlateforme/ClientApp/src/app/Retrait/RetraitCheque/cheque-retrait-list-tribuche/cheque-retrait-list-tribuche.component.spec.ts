import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequeRetraitListTribucheComponent } from './cheque-retrait-list-tribuche.component';

describe('ChequeRetraitListTribucheComponent', () => {
  let component: ChequeRetraitListTribucheComponent;
  let fixture: ComponentFixture<ChequeRetraitListTribucheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequeRetraitListTribucheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequeRetraitListTribucheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
