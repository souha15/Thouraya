import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuReportsFinAdminComponent } from './menu-reports-fin-admin.component';

describe('MenuReportsFinAdminComponent', () => {
  let component: MenuReportsFinAdminComponent;
  let fixture: ComponentFixture<MenuReportsFinAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuReportsFinAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuReportsFinAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
