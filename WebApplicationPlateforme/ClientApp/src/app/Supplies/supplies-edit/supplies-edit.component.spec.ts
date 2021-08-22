import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliesEditComponent } from './supplies-edit.component';

describe('SuppliesEditComponent', () => {
  let component: SuppliesEditComponent;
  let fixture: ComponentFixture<SuppliesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuppliesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
