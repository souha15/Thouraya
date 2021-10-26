import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequeRetraitEditComponent } from './cheque-retrait-edit.component';

describe('ChequeRetraitEditComponent', () => {
  let component: ChequeRetraitEditComponent;
  let fixture: ComponentFixture<ChequeRetraitEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequeRetraitEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequeRetraitEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
