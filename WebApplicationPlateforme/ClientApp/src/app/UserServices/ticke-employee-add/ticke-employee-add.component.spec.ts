import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TickeEmployeeAddComponent } from './ticke-employee-add.component';

describe('TickeEmployeeAddComponent', () => {
  let component: TickeEmployeeAddComponent;
  let fixture: ComponentFixture<TickeEmployeeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TickeEmployeeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TickeEmployeeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
