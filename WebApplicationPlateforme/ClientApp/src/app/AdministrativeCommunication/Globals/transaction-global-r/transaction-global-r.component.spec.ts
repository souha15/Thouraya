import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionGlobalRComponent } from './transaction-global-r.component';

describe('TransactionGlobalRComponent', () => {
  let component: TransactionGlobalRComponent;
  let fixture: ComponentFixture<TransactionGlobalRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionGlobalRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionGlobalRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
