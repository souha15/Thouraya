import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnregistrerLocataireComponent } from './enregistrer-locataire.component';

describe('EnregistrerLocataireComponent', () => {
  let component: EnregistrerLocataireComponent;
  let fixture: ComponentFixture<EnregistrerLocataireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnregistrerLocataireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnregistrerLocataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
