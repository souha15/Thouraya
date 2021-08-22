import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatCompteSettingsComponent } from './etat-compte-settings.component';

describe('EtatCompteSettingsComponent', () => {
  let component: EtatCompteSettingsComponent;
  let fixture: ComponentFixture<EtatCompteSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtatCompteSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtatCompteSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
