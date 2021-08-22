import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayChequecDetailComponent } from './pay-chequec-detail.component';

describe('PayChequecDetailComponent', () => {
  let component: PayChequecDetailComponent;
  let fixture: ComponentFixture<PayChequecDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayChequecDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayChequecDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
