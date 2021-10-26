import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequeRetraitListActiveComponent } from './cheque-retrait-list-active.component';

describe('ChequeRetraitListActiveComponent', () => {
  let component: ChequeRetraitListActiveComponent;
  let fixture: ComponentFixture<ChequeRetraitListActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequeRetraitListActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequeRetraitListActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
