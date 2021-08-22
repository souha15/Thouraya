import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuStockageSettingsComponent } from './menu-stockage-settings.component';

describe('MenuStockageSettingsComponent', () => {
  let component: MenuStockageSettingsComponent;
  let fixture: ComponentFixture<MenuStockageSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuStockageSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuStockageSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
