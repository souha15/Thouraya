import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRolesEditComponent } from './user-roles-edit.component';

describe('UserRolesEditComponent', () => {
  let component: UserRolesEditComponent;
  let fixture: ComponentFixture<UserRolesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRolesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRolesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
