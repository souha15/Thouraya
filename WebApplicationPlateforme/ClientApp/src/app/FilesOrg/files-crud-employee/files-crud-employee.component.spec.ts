import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesCrudEmployeeComponent } from './files-crud-employee.component';

describe('FilesCrudEmployeeComponent', () => {
  let component: FilesCrudEmployeeComponent;
  let fixture: ComponentFixture<FilesCrudEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesCrudEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesCrudEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
