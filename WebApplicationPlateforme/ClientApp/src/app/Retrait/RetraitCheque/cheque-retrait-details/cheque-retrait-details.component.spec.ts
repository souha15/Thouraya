import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequeRetraitDetailsComponent } from './cheque-retrait-details.component';

describe('ChequeRetraitDetailsComponent', () => {
  let component: ChequeRetraitDetailsComponent;
  let fixture: ComponentFixture<ChequeRetraitDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequeRetraitDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequeRetraitDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
