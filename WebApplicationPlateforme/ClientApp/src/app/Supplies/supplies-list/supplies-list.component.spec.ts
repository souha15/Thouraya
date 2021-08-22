import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliesListComponent } from './supplies-list.component';

describe('SuppliesListComponent', () => {
  let component: SuppliesListComponent;
  let fixture: ComponentFixture<SuppliesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuppliesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
