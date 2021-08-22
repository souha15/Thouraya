import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeFormationListdirComponent } from './demande-formation-listdir.component';

describe('DemandeFormationListdirComponent', () => {
  let component: DemandeFormationListdirComponent;
  let fixture: ComponentFixture<DemandeFormationListdirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeFormationListdirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeFormationListdirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
