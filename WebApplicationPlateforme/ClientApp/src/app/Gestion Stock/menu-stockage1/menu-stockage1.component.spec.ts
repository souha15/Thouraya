import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuStockage1Component } from './menu-stockage1.component';

describe('MenuStockage1Component', () => {
  let component: MenuStockage1Component;
  let fixture: ComponentFixture<MenuStockage1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuStockage1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuStockage1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
