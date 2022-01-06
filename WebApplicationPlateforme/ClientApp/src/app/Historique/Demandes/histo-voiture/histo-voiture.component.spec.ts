import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoVoitureComponent } from './histo-voiture.component';

describe('HistoVoitureComponent', () => {
  let component: HistoVoitureComponent;
  let fixture: ComponentFixture<HistoVoitureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoVoitureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoVoitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
