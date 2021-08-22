import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeMaintRequestListComponent } from './employee-maint-request-list.component';

describe('EmployeeMaintRequestListComponent', () => {
  let component: EmployeeMaintRequestListComponent;
  let fixture: ComponentFixture<EmployeeMaintRequestListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeMaintRequestListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeMaintRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
