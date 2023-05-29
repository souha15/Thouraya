import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaireReportComponent } from './salaire-report.component';

describe('SalaireReportComponent', () => {
  let component: SalaireReportComponent;
  let fixture: ComponentFixture<SalaireReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaireReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaireReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
