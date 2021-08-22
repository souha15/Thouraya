import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectedToMyAdminIComponent } from './affected-to-my-admin-i.component';

describe('AffectedToMyAdminIComponent', () => {
  let component: AffectedToMyAdminIComponent;
  let fixture: ComponentFixture<AffectedToMyAdminIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffectedToMyAdminIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectedToMyAdminIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
