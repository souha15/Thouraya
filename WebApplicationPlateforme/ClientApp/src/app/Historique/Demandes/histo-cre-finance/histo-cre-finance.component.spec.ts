import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoCreFinanceComponent } from './histo-cre-finance.component';

describe('HistoCreFinanceComponent', () => {
  let component: HistoCreFinanceComponent;
  let fixture: ComponentFixture<HistoCreFinanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoCreFinanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoCreFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
