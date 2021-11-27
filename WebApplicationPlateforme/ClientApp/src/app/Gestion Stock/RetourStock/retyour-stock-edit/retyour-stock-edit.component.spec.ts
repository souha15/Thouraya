import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetyourStockEditComponent } from './retyour-stock-edit.component';

describe('RetyourStockEditComponent', () => {
  let component: RetyourStockEditComponent;
  let fixture: ComponentFixture<RetyourStockEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetyourStockEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetyourStockEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
