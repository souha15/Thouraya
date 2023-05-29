import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuReportsDotAdminComponent } from './menu-reports-dot-admin.component';

describe('MenuReportsDotAdminComponent', () => {
  let component: MenuReportsDotAdminComponent;
  let fixture: ComponentFixture<MenuReportsDotAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuReportsDotAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuReportsDotAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
