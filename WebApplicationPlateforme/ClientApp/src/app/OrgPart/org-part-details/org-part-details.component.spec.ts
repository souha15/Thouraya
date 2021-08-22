import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgPartDetailsComponent } from './org-part-details.component';

describe('OrgPartDetailsComponent', () => {
  let component: OrgPartDetailsComponent;
  let fixture: ComponentFixture<OrgPartDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgPartDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgPartDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
