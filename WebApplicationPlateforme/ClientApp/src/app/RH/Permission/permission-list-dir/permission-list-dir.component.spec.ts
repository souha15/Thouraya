import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionUListDirComponent } from './permission-list-dir.component';

describe('PermissionListDirComponent', () => {
  let component: PermissionUListDirComponent;
  let fixture: ComponentFixture<PermissionUListDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionUListDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionUListDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
