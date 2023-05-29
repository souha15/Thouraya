import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetraitReportComponent } from './retrait-report.component';

describe('RetraitReportComponent', () => {
  let component: RetraitReportComponent;
  let fixture: ComponentFixture<RetraitReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetraitReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetraitReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
