import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTuteurComponent } from './menu-tuteur.component';

describe('MenuTuteurComponent', () => {
  let component: MenuTuteurComponent;
  let fixture: ComponentFixture<MenuTuteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuTuteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuTuteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
