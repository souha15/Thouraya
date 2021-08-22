import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSettingsCompteComponent } from './menu-settings-compte.component';

describe('MenuSettingsCompteComponent', () => {
  let component: MenuSettingsCompteComponent;
  let fixture: ComponentFixture<MenuSettingsCompteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuSettingsCompteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuSettingsCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
