import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldeCongeComponent } from './solde-conge.component';

describe('SoldeCongeComponent', () => {
  let component: SoldeCongeComponent;
  let fixture: ComponentFixture<SoldeCongeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoldeCongeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoldeCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
