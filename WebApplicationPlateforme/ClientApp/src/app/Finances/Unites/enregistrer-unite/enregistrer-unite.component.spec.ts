import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnregistrerUniteComponent } from './enregistrer-unite.component';

describe('EnregistrerUniteComponent', () => {
  let component: EnregistrerUniteComponent;
  let fixture: ComponentFixture<EnregistrerUniteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnregistrerUniteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnregistrerUniteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
