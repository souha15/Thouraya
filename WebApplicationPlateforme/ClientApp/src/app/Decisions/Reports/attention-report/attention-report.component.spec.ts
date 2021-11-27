import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttentionReportComponent } from './attention-report.component';

describe('AttentionReportComponent', () => {
  let component: AttentionReportComponent;
  let fixture: ComponentFixture<AttentionReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttentionReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttentionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
