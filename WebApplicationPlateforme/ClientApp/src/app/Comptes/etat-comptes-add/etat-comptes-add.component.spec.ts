import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatComptesAddComponent } from './etat-comptes-add.component';

describe('EtatComptesAddComponent', () => {
  let component: EtatComptesAddComponent;
  let fixture: ComponentFixture<EtatComptesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtatComptesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtatComptesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
