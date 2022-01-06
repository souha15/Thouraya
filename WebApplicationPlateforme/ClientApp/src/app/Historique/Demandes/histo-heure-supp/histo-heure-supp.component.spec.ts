import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoHeureSuppComponent } from './histo-heure-supp.component';

describe('HistoHeureSuppComponent', () => {
  let component: HistoHeureSuppComponent;
  let fixture: ComponentFixture<HistoHeureSuppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoHeureSuppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoHeureSuppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
