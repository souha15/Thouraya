import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedFactureComponent } from './accepted-facture.component';

describe('AcceptedFactureComponent', () => {
  let component: AcceptedFactureComponent;
  let fixture: ComponentFixture<AcceptedFactureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptedFactureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptedFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
