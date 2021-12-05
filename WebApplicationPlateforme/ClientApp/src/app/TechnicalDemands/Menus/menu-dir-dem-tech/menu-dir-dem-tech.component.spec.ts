import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDirDemTechComponent } from './menu-dir-dem-tech.component';

describe('MenuDirDemTechComponent', () => {
  let component: MenuDirDemTechComponent;
  let fixture: ComponentFixture<MenuDirDemTechComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuDirDemTechComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDirDemTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
