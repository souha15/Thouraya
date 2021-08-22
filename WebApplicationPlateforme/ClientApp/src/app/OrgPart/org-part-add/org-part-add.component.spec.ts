import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgPartAddComponent } from './org-part-add.component';

describe('OrgPartAddComponent', () => {
  let component: OrgPartAddComponent;
  let fixture: ComponentFixture<OrgPartAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgPartAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgPartAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
