import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MontageEmployeeAddFilesComponent } from './montage-employee-add-files.component';

describe('MontageEmployeeAddFilesComponent', () => {
  let component: MontageEmployeeAddFilesComponent;
  let fixture: ComponentFixture<MontageEmployeeAddFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MontageEmployeeAddFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MontageEmployeeAddFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
