import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoAllMaintenanceComponent } from './histo-all-maintenance.component';

describe('HistoAllMaintenanceComponent', () => {
  let component: HistoAllMaintenanceComponent;
  let fixture: ComponentFixture<HistoAllMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoAllMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoAllMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
