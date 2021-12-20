import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeVoitureAddComponent } from './demande-voiture-add.component';

describe('DemandeVoitureAddComponent', () => {
  let component: DemandeVoitureAddComponent;
  let fixture: ComponentFixture<DemandeVoitureAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeVoitureAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeVoitureAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
