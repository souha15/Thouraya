import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenuSettingsDetailsComponent } from './side-menu-settings-details.component';

describe('SideMenuSettingsDetailsComponent', () => {
  let component: SideMenuSettingsDetailsComponent;
  let fixture: ComponentFixture<SideMenuSettingsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideMenuSettingsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideMenuSettingsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
