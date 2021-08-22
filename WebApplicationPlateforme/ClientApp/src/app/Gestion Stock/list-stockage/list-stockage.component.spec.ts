import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStockageComponent } from './list-stockage.component';

describe('ListStockageComponent', () => {
  let component: ListStockageComponent;
  let fixture: ComponentFixture<ListStockageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListStockageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStockageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
