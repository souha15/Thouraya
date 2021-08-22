import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttestationTravailRhListComponent } from './attestation-travail-rh-list.component';

describe('AttestationTravailRhListComponent', () => {
  let component: AttestationTravailRhListComponent;
  let fixture: ComponentFixture<AttestationTravailRhListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttestationTravailRhListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttestationTravailRhListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
