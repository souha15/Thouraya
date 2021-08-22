import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpdatingComponent } from './user-updating.component';

describe('UserUpdatingComponent', () => {
  let component: UserUpdatingComponent;
  let fixture: ComponentFixture<UserUpdatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserUpdatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUpdatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
