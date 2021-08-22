import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTypeStockComponent } from './list-type-stock.component';

describe('ListTypeStockComponent', () => {
  let component: ListTypeStockComponent;
  let fixture: ComponentFixture<ListTypeStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTypeStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTypeStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
