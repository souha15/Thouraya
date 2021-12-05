import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuUserDemTechComponent } from './menu-user-dem-tech.component';

describe('MenuUserDemTechComponent', () => {
  let component: MenuUserDemTechComponent;
  let fixture: ComponentFixture<MenuUserDemTechComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuUserDemTechComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuUserDemTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
