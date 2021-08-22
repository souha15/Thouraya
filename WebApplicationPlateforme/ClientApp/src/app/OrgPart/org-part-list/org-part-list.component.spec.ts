import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgPartListComponent } from './org-part-list.component';

describe('OrgPartListComponent', () => {
  let component: OrgPartListComponent;
  let fixture: ComponentFixture<OrgPartListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgPartListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgPartListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
