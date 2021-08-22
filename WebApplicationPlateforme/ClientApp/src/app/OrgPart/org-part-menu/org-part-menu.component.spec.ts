import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgPartMenuComponent } from './org-part-menu.component';

describe('OrgPartMenuComponent', () => {
  let component: OrgPartMenuComponent;
  let fixture: ComponentFixture<OrgPartMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgPartMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgPartMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
