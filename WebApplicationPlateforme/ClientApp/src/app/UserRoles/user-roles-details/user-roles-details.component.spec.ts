import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRolesDetailsComponent } from './user-roles-details.component';

describe('UserRolesDetailsComponent', () => {
  let component: UserRolesDetailsComponent;
  let fixture: ComponentFixture<UserRolesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRolesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRolesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
