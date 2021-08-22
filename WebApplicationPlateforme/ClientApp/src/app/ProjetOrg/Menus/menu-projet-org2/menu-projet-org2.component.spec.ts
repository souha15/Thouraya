import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuProjetOrg2Component } from './menu-projet-org2.component';

describe('MenuProjetOrg2Component', () => {
  let component: MenuProjetOrg2Component;
  let fixture: ComponentFixture<MenuProjetOrg2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuProjetOrg2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuProjetOrg2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
