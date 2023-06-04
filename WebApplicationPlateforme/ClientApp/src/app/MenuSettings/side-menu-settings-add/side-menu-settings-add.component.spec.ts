import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenuSettingsAddComponent } from './side-menu-settings-add.component';

describe('SideMenuSettingsAddComponent', () => {
  let component: SideMenuSettingsAddComponent;
  let fixture: ComponentFixture<SideMenuSettingsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideMenuSettingsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideMenuSettingsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
