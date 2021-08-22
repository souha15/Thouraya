import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaireCComponent } from './beneficiaire-c.component';

describe('BeneficiaireCComponent', () => {
  let component: BeneficiaireCComponent;
  let fixture: ComponentFixture<BeneficiaireCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeneficiaireCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiaireCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
