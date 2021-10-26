import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuActiviteeComponent } from './menu-activitee.component';

describe('MenuActiviteeComponent', () => {
  let component: MenuActiviteeComponent;
  let fixture: ComponentFixture<MenuActiviteeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuActiviteeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuActiviteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
