import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainFarametrageFinancePageComponent } from './main-farametrage-finance-page.component';

describe('MainFarametrageFinancePageComponent', () => {
  let component: MainFarametrageFinancePageComponent;
  let fixture: ComponentFixture<MainFarametrageFinancePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainFarametrageFinancePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainFarametrageFinancePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
