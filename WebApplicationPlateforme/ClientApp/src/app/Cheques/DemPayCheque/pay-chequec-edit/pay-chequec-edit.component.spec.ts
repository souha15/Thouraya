import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayChequecEditComponent } from './pay-chequec-edit.component';

describe('PayChequecEditComponent', () => {
  let component: PayChequecEditComponent;
  let fixture: ComponentFixture<PayChequecEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayChequecEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayChequecEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
