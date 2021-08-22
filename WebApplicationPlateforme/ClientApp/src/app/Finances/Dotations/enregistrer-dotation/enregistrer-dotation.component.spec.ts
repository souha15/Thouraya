import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnregistrerDotationComponent } from './enregistrer-dotation.component';

describe('EnregistrerDotationComponent', () => {
  let component: EnregistrerDotationComponent;
  let fixture: ComponentFixture<EnregistrerDotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnregistrerDotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnregistrerDotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
