import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequeRetraitAddComponent } from './cheque-retrait-add.component';

describe('ChequeRetraitAddComponent', () => {
  let component: ChequeRetraitAddComponent;
  let fixture: ComponentFixture<ChequeRetraitAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequeRetraitAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequeRetraitAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
