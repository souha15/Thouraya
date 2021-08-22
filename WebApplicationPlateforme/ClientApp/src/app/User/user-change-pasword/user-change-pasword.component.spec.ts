import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChangePaswordComponent } from './user-change-pasword.component';

describe('UserChangePaswordComponent', () => {
  let component: UserChangePaswordComponent;
  let fixture: ComponentFixture<UserChangePaswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserChangePaswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChangePaswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
