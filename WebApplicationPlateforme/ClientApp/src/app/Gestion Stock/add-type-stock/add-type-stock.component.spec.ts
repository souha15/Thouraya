import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeStockComponent } from './add-type-stock.component';

describe('AddTypeStockComponent', () => {
  let component: AddTypeStockComponent;
  let fixture: ComponentFixture<AddTypeStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTypeStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTypeStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
