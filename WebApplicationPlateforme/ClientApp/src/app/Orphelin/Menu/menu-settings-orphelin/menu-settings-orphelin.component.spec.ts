import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSettingsOrphelinComponent } from './menu-settings-orphelin.component';

describe('MenuSettingsOrphelinComponent', () => {
  let component: MenuSettingsOrphelinComponent;
  let fixture: ComponentFixture<MenuSettingsOrphelinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuSettingsOrphelinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuSettingsOrphelinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
