import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPointageEmpComponent } from './menu-pointage-emp.component';

describe('MenuPointageEmpComponent', () => {
  let component: MenuPointageEmpComponent;
  let fixture: ComponentFixture<MenuPointageEmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuPointageEmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuPointageEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
