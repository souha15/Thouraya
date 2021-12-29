import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMaintenanceListEmployeeComponent } from './all-maintenance-list-employee.component';

describe('AllMaintenanceListEmployeeComponent', () => {
  let component: AllMaintenanceListEmployeeComponent;
  let fixture: ComponentFixture<AllMaintenanceListEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllMaintenanceListEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllMaintenanceListEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
