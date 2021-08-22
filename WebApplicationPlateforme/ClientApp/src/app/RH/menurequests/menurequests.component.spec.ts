import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenurequestsComponent } from './menurequests.component';

describe('MenurequestsComponent', () => {
  let component: MenurequestsComponent;
  let fixture: ComponentFixture<MenurequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenurequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenurequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
