import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeVoitureListDirComponent } from './demande-voiture-list-dir.component';

describe('DemandeVoitureListDirComponent', () => {
  let component: DemandeVoitureListDirComponent;
  let fixture: ComponentFixture<DemandeVoitureListDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeVoitureListDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeVoitureListDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
