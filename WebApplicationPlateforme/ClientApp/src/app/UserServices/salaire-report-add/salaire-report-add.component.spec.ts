import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaireReportAddComponent } from './salaire-report-add.component';

describe('SalaireReportAddComponent', () => {
  let component: SalaireReportAddComponent;
  let fixture: ComponentFixture<SalaireReportAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaireReportAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaireReportAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
