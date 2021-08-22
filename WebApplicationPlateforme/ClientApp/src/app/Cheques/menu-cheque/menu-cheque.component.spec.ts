import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuChequeComponent } from './menu-cheque.component';

describe('MenuChequeComponent', () => {
  let component: MenuChequeComponent;
  let fixture: ComponentFixture<MenuChequeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuChequeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuChequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
