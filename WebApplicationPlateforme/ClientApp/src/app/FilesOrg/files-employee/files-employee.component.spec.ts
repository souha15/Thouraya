import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesEmployeeComponent } from './files-employee.component';

describe('FilesEmployeeComponent', () => {
  let component: FilesEmployeeComponent;
  let fixture: ComponentFixture<FilesEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
