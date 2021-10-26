import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRetraitChequeComponent } from './menu-retrait-cheque.component';

describe('MenuRetraitChequeComponent', () => {
  let component: MenuRetraitChequeComponent;
  let fixture: ComponentFixture<MenuRetraitChequeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuRetraitChequeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuRetraitChequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
