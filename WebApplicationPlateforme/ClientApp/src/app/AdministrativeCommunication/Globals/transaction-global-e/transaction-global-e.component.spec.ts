import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionGlobalEComponent } from './transaction-global-e.component';

describe('TransactionGlobalEComponent', () => {
  let component: TransactionGlobalEComponent;
  let fixture: ComponentFixture<TransactionGlobalEComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionGlobalEComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionGlobalEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
