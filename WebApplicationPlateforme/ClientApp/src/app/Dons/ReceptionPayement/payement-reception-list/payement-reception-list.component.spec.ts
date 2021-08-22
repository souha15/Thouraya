import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayementReceptionListComponent } from './payement-reception-list.component';

describe('PayementReceptionListComponent', () => {
  let component: PayementReceptionListComponent;
  let fixture: ComponentFixture<PayementReceptionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayementReceptionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayementReceptionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
