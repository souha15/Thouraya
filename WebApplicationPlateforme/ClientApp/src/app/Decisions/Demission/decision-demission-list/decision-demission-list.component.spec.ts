import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionDemissionListComponent } from './decision-demission-list.component';

describe('DecisionDemissionListComponent', () => {
  let component: DecisionDemissionListComponent;
  let fixture: ComponentFixture<DecisionDemissionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecisionDemissionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisionDemissionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
