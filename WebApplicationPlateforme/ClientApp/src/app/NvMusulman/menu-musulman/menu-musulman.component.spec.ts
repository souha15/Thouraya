import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMusulmanComponent } from './menu-musulman.component';

describe('MenuMusulmanComponent', () => {
  let component: MenuMusulmanComponent;
  let fixture: ComponentFixture<MenuMusulmanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuMusulmanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuMusulmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
