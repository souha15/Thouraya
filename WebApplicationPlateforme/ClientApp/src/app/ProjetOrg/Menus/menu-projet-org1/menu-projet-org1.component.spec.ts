import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuProjetOrg1Component } from './menu-projet-org1.component';

describe('MenuProjetOrg1Component', () => {
  let component: MenuProjetOrg1Component;
  let fixture: ComponentFixture<MenuProjetOrg1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuProjetOrg1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuProjetOrg1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
