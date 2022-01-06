import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoMaintenanceComponent } from './histo-maintenance.component';

describe('HistoMaintenanceComponent', () => {
  let component: HistoMaintenanceComponent;
  let fixture: ComponentFixture<HistoMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
