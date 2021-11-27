import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDecisionListComponent } from './menu-decision-list.component';

describe('MenuDecisionListComponent', () => {
  let component: MenuDecisionListComponent;
  let fixture: ComponentFixture<MenuDecisionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuDecisionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDecisionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
