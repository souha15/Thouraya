import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChequeListPayeeComponent } from './new-cheque-list-payee.component';

describe('NewChequeListPayeeComponent', () => {
  let component: NewChequeListPayeeComponent;
  let fixture: ComponentFixture<NewChequeListPayeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewChequeListPayeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewChequeListPayeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
