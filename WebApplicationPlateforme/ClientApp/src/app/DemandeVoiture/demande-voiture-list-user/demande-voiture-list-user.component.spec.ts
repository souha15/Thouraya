import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeVoitureListUserComponent } from './demande-voiture-list-user.component';

describe('DemandeVoitureListUserComponent', () => {
  let component: DemandeVoitureListUserComponent;
  let fixture: ComponentFixture<DemandeVoitureListUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeVoitureListUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeVoitureListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
