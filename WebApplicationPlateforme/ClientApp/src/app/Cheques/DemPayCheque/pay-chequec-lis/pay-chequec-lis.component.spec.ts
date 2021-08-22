import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayChequecLisComponent } from './pay-chequec-lis.component';

describe('PayChequecLisComponent', () => {
  let component: PayChequecLisComponent;
  let fixture: ComponentFixture<PayChequecLisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayChequecLisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayChequecLisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
