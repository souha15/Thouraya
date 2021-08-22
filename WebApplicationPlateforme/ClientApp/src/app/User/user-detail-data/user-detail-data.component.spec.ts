import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailDataComponent } from './user-detail-data.component';

describe('UserDetailDataComponent', () => {
  let component: UserDetailDataComponent;
  let fixture: ComponentFixture<UserDetailDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
