import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionGlobalIComponent } from './transaction-global-i.component';

describe('TransactionGlobalIComponent', () => {
  let component: TransactionGlobalIComponent;
  let fixture: ComponentFixture<TransactionGlobalIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionGlobalIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionGlobalIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
