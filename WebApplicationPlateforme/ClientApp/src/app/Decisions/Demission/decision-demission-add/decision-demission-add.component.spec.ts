import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionDemissionAddComponent } from './decision-demission-add.component';

describe('DecisionDemissionAddComponent', () => {
  let component: DecisionDemissionAddComponent;
  let fixture: ComponentFixture<DecisionDemissionAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecisionDemissionAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisionDemissionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
