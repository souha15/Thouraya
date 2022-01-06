import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoVenteComponent } from './histo-vente.component';

describe('HistoVenteComponent', () => {
  let component: HistoVenteComponent;
  let fixture: ComponentFixture<HistoVenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoVenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
