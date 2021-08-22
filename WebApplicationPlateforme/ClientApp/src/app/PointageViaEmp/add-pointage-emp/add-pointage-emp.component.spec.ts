import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPointageEmpComponent } from './add-pointage-emp.component';

describe('AddPointageEmpComponent', () => {
  let component: AddPointageEmpComponent;
  let fixture: ComponentFixture<AddPointageEmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPointageEmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPointageEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
