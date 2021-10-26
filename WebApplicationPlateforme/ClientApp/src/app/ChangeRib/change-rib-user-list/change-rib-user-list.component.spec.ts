import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeRibUserListComponent } from './change-rib-user-list.component';

describe('ChangeRibUserListComponent', () => {
  let component: ChangeRibUserListComponent;
  let fixture: ComponentFixture<ChangeRibUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeRibUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeRibUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
