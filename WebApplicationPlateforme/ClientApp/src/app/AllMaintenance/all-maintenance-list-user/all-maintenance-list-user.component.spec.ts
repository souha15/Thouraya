import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMaintenanceListUserComponent } from './all-maintenance-list-user.component';

describe('AllMaintenanceListUserComponent', () => {
  let component: AllMaintenanceListUserComponent;
  let fixture: ComponentFixture<AllMaintenanceListUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllMaintenanceListUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllMaintenanceListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
