import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgPartEditComponent } from './org-part-edit.component';

describe('OrgPartEditComponent', () => {
  let component: OrgPartEditComponent;
  let fixture: ComponentFixture<OrgPartEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgPartEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgPartEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
