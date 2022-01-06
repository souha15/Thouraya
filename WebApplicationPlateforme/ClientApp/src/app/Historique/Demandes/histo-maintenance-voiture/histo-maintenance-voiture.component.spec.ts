import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoMaintenanceVoitureComponent } from './histo-maintenance-voiture.component';

describe('HistoMaintenanceVoitureComponent', () => {
  let component: HistoMaintenanceVoitureComponent;
  let fixture: ComponentFixture<HistoMaintenanceVoitureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoMaintenanceVoitureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoMaintenanceVoitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
