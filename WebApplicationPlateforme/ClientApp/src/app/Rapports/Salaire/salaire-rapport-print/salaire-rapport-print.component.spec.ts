import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaireRapportPrintComponent } from './salaire-rapport-print.component';

describe('SalaireRapportPrintComponent', () => {
  let component: SalaireRapportPrintComponent;
  let fixture: ComponentFixture<SalaireRapportPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaireRapportPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaireRapportPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
