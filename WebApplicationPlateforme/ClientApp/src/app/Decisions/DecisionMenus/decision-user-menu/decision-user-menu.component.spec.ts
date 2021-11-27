import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionUserMenuComponent } from './decision-user-menu.component';

describe('DecisionUserMenuComponent', () => {
  let component: DecisionUserMenuComponent;
  let fixture: ComponentFixture<DecisionUserMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecisionUserMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisionUserMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
