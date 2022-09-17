import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsAffectedToMyAdminOrToMeComponent } from './transactions-affected-to-my-admin-or-to-me.component';

describe('TransactionsAffectedToMyAdminOrToMeComponent', () => {
  let component: TransactionsAffectedToMyAdminOrToMeComponent;
  let fixture: ComponentFixture<TransactionsAffectedToMyAdminOrToMeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionsAffectedToMyAdminOrToMeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsAffectedToMyAdminOrToMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
