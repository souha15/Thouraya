import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuReportsDawaaAdminMenComponent } from './menu-reports-dawaa-admin-men.component';

describe('MenuReportsDawaaAdminMenComponent', () => {
  let component: MenuReportsDawaaAdminMenComponent;
  let fixture: ComponentFixture<MenuReportsDawaaAdminMenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuReportsDawaaAdminMenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuReportsDawaaAdminMenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
