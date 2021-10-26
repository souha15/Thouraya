import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChequeMenuPayeeComponent } from './new-cheque-menu-payee.component';

describe('NewChequeMenuPayeeComponent', () => {
  let component: NewChequeMenuPayeeComponent;
  let fixture: ComponentFixture<NewChequeMenuPayeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewChequeMenuPayeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewChequeMenuPayeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
