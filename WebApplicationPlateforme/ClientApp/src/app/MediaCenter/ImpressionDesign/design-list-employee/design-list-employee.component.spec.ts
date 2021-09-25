import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignListEmployeeComponent } from './design-list-employee.component';

describe('DesignListEmployeeComponent', () => {
  let component: DesignListEmployeeComponent;
  let fixture: ComponentFixture<DesignListEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignListEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignListEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
