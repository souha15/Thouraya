import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayementReceptionAddComponent } from './payement-reception-add.component';

describe('PayementReceptionAddComponent', () => {
  let component: PayementReceptionAddComponent;
  let fixture: ComponentFixture<PayementReceptionAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayementReceptionAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayementReceptionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
