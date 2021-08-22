import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainFinancePageComponent } from './main-finance-page.component';

describe('MainFinancePageComponent', () => {
  let component: MainFinancePageComponent;
  let fixture: ComponentFixture<MainFinancePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainFinancePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainFinancePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
