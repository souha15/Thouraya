import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointageUserListComponent } from './pointage-user-list.component';

describe('PointageUserListComponent', () => {
  let component: PointageUserListComponent;
  let fixture: ComponentFixture<PointageUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointageUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointageUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
