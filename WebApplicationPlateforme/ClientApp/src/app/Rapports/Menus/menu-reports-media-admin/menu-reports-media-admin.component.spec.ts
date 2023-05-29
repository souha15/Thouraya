import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuReportsMediaAdminComponent } from './menu-reports-media-admin.component';

describe('MenuReportsMediaAdminComponent', () => {
  let component: MenuReportsMediaAdminComponent;
  let fixture: ComponentFixture<MenuReportsMediaAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuReportsMediaAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuReportsMediaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
