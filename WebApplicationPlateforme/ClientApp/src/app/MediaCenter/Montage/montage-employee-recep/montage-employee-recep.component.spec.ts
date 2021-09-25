import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MontageEmployeeRecepComponent } from './montage-employee-recep.component';

describe('MontageEmployeeRecepComponent', () => {
  let component: MontageEmployeeRecepComponent;
  let fixture: ComponentFixture<MontageEmployeeRecepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MontageEmployeeRecepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MontageEmployeeRecepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
