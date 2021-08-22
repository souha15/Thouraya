import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnregistrerDecisionComponent } from './enregistrer-decision.component';

describe('EnregistrerDecisionComponent', () => {
  let component: EnregistrerDecisionComponent;
  let fixture: ComponentFixture<EnregistrerDecisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnregistrerDecisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnregistrerDecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
