import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMaintenanceTypeCrudComponent } from './all-maintenance-type-crud.component';

describe('AllMaintenanceTypeCrudComponent', () => {
  let component: AllMaintenanceTypeCrudComponent;
  let fixture: ComponentFixture<AllMaintenanceTypeCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllMaintenanceTypeCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllMaintenanceTypeCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
