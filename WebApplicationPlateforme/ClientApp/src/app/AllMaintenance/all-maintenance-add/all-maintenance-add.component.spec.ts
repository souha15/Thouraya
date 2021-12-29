import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMaintenanceAddComponent } from './all-maintenance-add.component';

describe('AllMaintenanceAddComponent', () => {
  let component: AllMaintenanceAddComponent;
  let fixture: ComponentFixture<AllMaintenanceAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllMaintenanceAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllMaintenanceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
