import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayChequecAddComponent } from './pay-chequec-add.component';

describe('PayChequecAddComponent', () => {
  let component: PayChequecAddComponent;
  let fixture: ComponentFixture<PayChequecAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayChequecAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayChequecAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
