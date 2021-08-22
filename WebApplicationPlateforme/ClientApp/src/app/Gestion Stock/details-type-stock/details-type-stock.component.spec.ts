import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTypeStockComponent } from './details-type-stock.component';

describe('DetailsTypeStockComponent', () => {
  let component: DetailsTypeStockComponent;
  let fixture: ComponentFixture<DetailsTypeStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsTypeStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTypeStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
