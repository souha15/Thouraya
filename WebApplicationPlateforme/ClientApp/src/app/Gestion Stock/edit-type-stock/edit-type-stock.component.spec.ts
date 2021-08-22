import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTypeStockComponent } from './edit-type-stock.component';

describe('EditTypeStockComponent', () => {
  let component: EditTypeStockComponent;
  let fixture: ComponentFixture<EditTypeStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTypeStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTypeStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
