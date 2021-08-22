import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingTransactionsPageComponent } from './adding-transactions-page.component';

describe('AddingTransactionsPageComponent', () => {
  let component: AddingTransactionsPageComponent;
  let fixture: ComponentFixture<AddingTransactionsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddingTransactionsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddingTransactionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
