import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoStockageComponent } from './histo-stockage.component';

describe('HistoStockageComponent', () => {
  let component: HistoStockageComponent;
  let fixture: ComponentFixture<HistoStockageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoStockageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoStockageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
