import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsBenPayStockageComponent } from './details-ben-pay-stockage.component';

describe('DetailsBenPayStockageComponent', () => {
  let component: DetailsBenPayStockageComponent;
  let fixture: ComponentFixture<DetailsBenPayStockageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsBenPayStockageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsBenPayStockageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
