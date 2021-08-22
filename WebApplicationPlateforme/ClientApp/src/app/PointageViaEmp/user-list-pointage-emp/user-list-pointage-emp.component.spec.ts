import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListPointageEmpComponent } from './user-list-pointage-emp.component';

describe('UserListPointageEmpComponent', () => {
  let component: UserListPointageEmpComponent;
  let fixture: ComponentFixture<UserListPointageEmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserListPointageEmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListPointageEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
