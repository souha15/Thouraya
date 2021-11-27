import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionDirMenuComponent } from './decision-dir-menu.component';

describe('DecisionDirMenuComponent', () => {
  let component: DecisionDirMenuComponent;
  let fixture: ComponentFixture<DecisionDirMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecisionDirMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisionDirMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
