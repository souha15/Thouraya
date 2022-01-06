import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoAttestationComponent } from './histo-attestation.component';

describe('HistoAttestationComponent', () => {
  let component: HistoAttestationComponent;
  let fixture: ComponentFixture<HistoAttestationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoAttestationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoAttestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
