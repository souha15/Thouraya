import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuReportsDirGeneralComponent } from './menu-reports-dir-general.component';

describe('MenuReportsDirGeneralComponent', () => {
  let component: MenuReportsDirGeneralComponent;
  let fixture: ComponentFixture<MenuReportsDirGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuReportsDirGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuReportsDirGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
