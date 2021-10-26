import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequeRetraitListGeneralComponent } from './cheque-retrait-list-general.component';

describe('ChequeRetraitListGeneralComponent', () => {
  let component: ChequeRetraitListGeneralComponent;
  let fixture: ComponentFixture<ChequeRetraitListGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequeRetraitListGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequeRetraitListGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
