import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePrivilegesAddComponent } from './employee-privileges-add.component';

describe('EmployeePrivilegesAddComponent', () => {
  let component: EmployeePrivilegesAddComponent;
  let fixture: ComponentFixture<EmployeePrivilegesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeePrivilegesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePrivilegesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
