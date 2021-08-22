import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionListComponent } from './decision-list.component';

describe('DecisionListComponent', () => {
  let component: DecisionListComponent;
  let fixture: ComponentFixture<DecisionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecisionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
