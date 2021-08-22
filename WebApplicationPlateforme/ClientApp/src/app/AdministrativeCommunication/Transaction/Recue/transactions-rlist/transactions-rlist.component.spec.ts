import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsRListComponent } from './transactions-rlist.component';

describe('TransactionsRListComponent', () => {
  let component: TransactionsRListComponent;
  let fixture: ComponentFixture<TransactionsRListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionsRListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsRListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
