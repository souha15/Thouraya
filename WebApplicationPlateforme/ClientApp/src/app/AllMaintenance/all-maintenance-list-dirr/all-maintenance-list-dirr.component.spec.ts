import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMaintenanceListDirrComponent } from './all-maintenance-list-dirr.component';

describe('AllMaintenanceListDirrComponent', () => {
  let component: AllMaintenanceListDirrComponent;
  let fixture: ComponentFixture<AllMaintenanceListDirrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllMaintenanceListDirrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllMaintenanceListDirrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
