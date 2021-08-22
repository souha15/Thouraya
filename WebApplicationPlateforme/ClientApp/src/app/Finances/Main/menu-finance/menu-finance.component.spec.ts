import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuFinanceComponent } from './menu-finance.component';

describe('MenuFinanceComponent', () => {
  let component: MenuFinanceComponent;
  let fixture: ComponentFixture<MenuFinanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuFinanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
