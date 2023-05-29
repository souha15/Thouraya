import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuReportsDawaaAdminWomenComponent } from './menu-reports-dawaa-admin-women.component';

describe('MenuReportsDawaaAdminWomenComponent', () => {
  let component: MenuReportsDawaaAdminWomenComponent;
  let fixture: ComponentFixture<MenuReportsDawaaAdminWomenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuReportsDawaaAdminWomenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuReportsDawaaAdminWomenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
