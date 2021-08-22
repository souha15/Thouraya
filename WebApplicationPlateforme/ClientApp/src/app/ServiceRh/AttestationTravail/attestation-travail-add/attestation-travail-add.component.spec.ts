import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttestationTravailAddComponent } from './attestation-travail-add.component';

describe('AttestationTravailAddComponent', () => {
  let component: AttestationTravailAddComponent;
  let fixture: ComponentFixture<AttestationTravailAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttestationTravailAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttestationTravailAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
