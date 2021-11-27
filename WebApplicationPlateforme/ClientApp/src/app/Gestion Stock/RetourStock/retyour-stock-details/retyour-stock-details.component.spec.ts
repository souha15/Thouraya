import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetyourStockDetailsComponent } from './retyour-stock-details.component';

describe('RetyourStockDetailsComponent', () => {
  let component: RetyourStockDetailsComponent;
  let fixture: ComponentFixture<RetyourStockDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetyourStockDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetyourStockDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
