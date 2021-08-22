import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatdotationComponent } from './etatdotation.component';

describe('EtatdotationComponent', () => {
  let component: EtatdotationComponent;
  let fixture: ComponentFixture<EtatdotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtatdotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtatdotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
