import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttestationTravailLisComponent } from './attestation-travail-lis.component';

describe('AttestationTravailLisComponent', () => {
  let component: AttestationTravailLisComponent;
  let fixture: ComponentFixture<AttestationTravailLisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttestationTravailLisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttestationTravailLisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
