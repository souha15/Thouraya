import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsStockComponent } from './details-stock.component';

describe('DetailsStockComponent', () => {
  let component: DetailsStockComponent;
  let fixture: ComponentFixture<DetailsStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
