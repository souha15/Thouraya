import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRetraitEspeceComponent } from './menu-retrait-espece.component';

describe('MenuRetraitEspeceComponent', () => {
  let component: MenuRetraitEspeceComponent;
  let fixture: ComponentFixture<MenuRetraitEspeceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuRetraitEspeceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuRetraitEspeceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
