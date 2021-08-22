import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuGestBenAddComponent } from './menu-gest-ben-add.component';

describe('MenuGestBenAddComponent', () => {
  let component: MenuGestBenAddComponent;
  let fixture: ComponentFixture<MenuGestBenAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuGestBenAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuGestBenAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
