import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBenPayStockageComponent } from './list-ben-pay-stockage.component';

describe('ListBenPayStockageComponent', () => {
  let component: ListBenPayStockageComponent;
  let fixture: ComponentFixture<ListBenPayStockageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBenPayStockageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBenPayStockageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
