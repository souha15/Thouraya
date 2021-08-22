import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSoldeComponent } from './menu-solde.component';

describe('MenuSoldeComponent', () => {
  let component: MenuSoldeComponent;
  let fixture: ComponentFixture<MenuSoldeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuSoldeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuSoldeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
