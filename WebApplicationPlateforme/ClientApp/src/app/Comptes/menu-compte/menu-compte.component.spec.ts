import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCompteComponent } from './menu-compte.component';

describe('MenuCompteComponent', () => {
  let component: MenuCompteComponent;
  let fixture: ComponentFixture<MenuCompteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuCompteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
