import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePrivilegesUpdateComponent } from './employee-privileges-update.component';

describe('EmployeePrivilegesUpdateComponent', () => {
  let component: EmployeePrivilegesUpdateComponent;
  let fixture: ComponentFixture<EmployeePrivilegesUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeePrivilegesUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePrivilegesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
