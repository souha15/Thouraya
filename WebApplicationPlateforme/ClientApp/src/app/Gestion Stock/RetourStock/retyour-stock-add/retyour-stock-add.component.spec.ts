import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetyourStockAddComponent } from './retyour-stock-add.component';

describe('RetyourStockAddComponent', () => {
  let component: RetyourStockAddComponent;
  let fixture: ComponentFixture<RetyourStockAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetyourStockAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetyourStockAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
