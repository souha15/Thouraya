import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetyourStockListComponent } from './retyour-stock-list.component';

describe('RetyourStockListComponent', () => {
  let component: RetyourStockListComponent;
  let fixture: ComponentFixture<RetyourStockListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetyourStockListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetyourStockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
