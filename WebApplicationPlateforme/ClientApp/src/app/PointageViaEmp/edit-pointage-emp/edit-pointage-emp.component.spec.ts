import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPointageEmpComponent } from './edit-pointage-emp.component';

describe('EditPointageEmpComponent', () => {
  let component: EditPointageEmpComponent;
  let fixture: ComponentFixture<EditPointageEmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPointageEmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPointageEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
