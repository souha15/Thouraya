import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuChequeForBoxMenComponent } from './menu-cheque-for-box-men.component';

describe('MenuChequeForBoxMenComponent', () => {
  let component: MenuChequeForBoxMenComponent;
  let fixture: ComponentFixture<MenuChequeForBoxMenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuChequeForBoxMenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuChequeForBoxMenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
