import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceMenuParamComponent } from './finance-menu-param.component';

describe('FinanceMenuParamComponent', () => {
  let component: FinanceMenuParamComponent;
  let fixture: ComponentFixture<FinanceMenuParamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceMenuParamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceMenuParamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
