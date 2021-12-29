import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMaintenanceListComponent } from './all-maintenance-list.component';

describe('AllMaintenanceListComponent', () => {
  let component: AllMaintenanceListComponent;
  let fixture: ComponentFixture<AllMaintenanceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllMaintenanceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllMaintenanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
