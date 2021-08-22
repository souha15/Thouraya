import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuParrainageComponent } from './menu-parrainage.component';

describe('MenuParrainageComponent', () => {
  let component: MenuParrainageComponent;
  let fixture: ComponentFixture<MenuParrainageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuParrainageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuParrainageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
