import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsElistComponent } from './transactions-elist.component';

describe('TransactionsElistComponent', () => {
  let component: TransactionsElistComponent;
  let fixture: ComponentFixture<TransactionsElistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionsElistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsElistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
