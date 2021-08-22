import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeBeneficiaireComponent } from './type-beneficiaire.component';

describe('TypeBeneficiaireComponent', () => {
  let component: TypeBeneficiaireComponent;
  let fixture: ComponentFixture<TypeBeneficiaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeBeneficiaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeBeneficiaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
