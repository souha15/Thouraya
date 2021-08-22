import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPointageEmpComponent } from './list-pointage-emp.component';

describe('ListPointageEmpComponent', () => {
  let component: ListPointageEmpComponent;
  let fixture: ComponentFixture<ListPointageEmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPointageEmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPointageEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
