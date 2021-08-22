import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStockageComponent } from './edit-stockage.component';

describe('EditStockageComponent', () => {
  let component: EditStockageComponent;
  let fixture: ComponentFixture<EditStockageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStockageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStockageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
