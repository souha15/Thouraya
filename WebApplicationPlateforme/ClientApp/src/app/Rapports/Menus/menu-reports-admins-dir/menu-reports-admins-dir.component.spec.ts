import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuReportsAdminsDirComponent } from './menu-reports-admins-dir.component';

describe('MenuReportsAdminsDirComponent', () => {
  let component: MenuReportsAdminsDirComponent;
  let fixture: ComponentFixture<MenuReportsAdminsDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuReportsAdminsDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuReportsAdminsDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
