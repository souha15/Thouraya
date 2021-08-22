import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnregistrerRevenusComponent } from './enregistrer-revenus.component';

describe('EnregistrerRevenusComponent', () => {
  let component: EnregistrerRevenusComponent;
  let fixture: ComponentFixture<EnregistrerRevenusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnregistrerRevenusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnregistrerRevenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
