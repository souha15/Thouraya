import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuNotAcceptedComponent } from './menu-not-accepted.component';

describe('MenuNotAcceptedComponent', () => {
  let component: MenuNotAcceptedComponent;
  let fixture: ComponentFixture<MenuNotAcceptedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuNotAcceptedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuNotAcceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
