import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuFormationComponent } from './menu-formation.component';

describe('MenuFormationComponent', () => {
  let component: MenuFormationComponent;
  let fixture: ComponentFixture<MenuFormationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuFormationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
