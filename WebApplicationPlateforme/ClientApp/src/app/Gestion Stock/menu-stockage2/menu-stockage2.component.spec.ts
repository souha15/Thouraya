import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuStockage2Component } from './menu-stockage2.component';

describe('MenuStockage2Component', () => {
  let component: MenuStockage2Component;
  let fixture: ComponentFixture<MenuStockage2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuStockage2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuStockage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
