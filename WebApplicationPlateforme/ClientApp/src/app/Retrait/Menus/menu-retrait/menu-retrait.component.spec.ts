import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRetraitComponent } from './menu-retrait.component';

describe('MenuRetraitComponent', () => {
  let component: MenuRetraitComponent;
  let fixture: ComponentFixture<MenuRetraitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuRetraitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuRetraitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
