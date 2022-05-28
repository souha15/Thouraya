import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoImpressionComponent } from './histo-impression.component';

describe('HistoImpressionComponent', () => {
  let component: HistoImpressionComponent;
  let fixture: ComponentFixture<HistoImpressionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoImpressionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoImpressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
