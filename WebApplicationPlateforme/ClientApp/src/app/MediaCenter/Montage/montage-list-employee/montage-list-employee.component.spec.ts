import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MontageListEmployeeComponent } from './montage-list-employee.component';

describe('MontageListEmployeeComponent', () => {
  let component: MontageListEmployeeComponent;
  let fixture: ComponentFixture<MontageListEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MontageListEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MontageListEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
