import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStockageComponent } from './add-stockage.component';

describe('AddStockageComponent', () => {
  let component: AddStockageComponent;
  let fixture: ComponentFixture<AddStockageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStockageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStockageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
