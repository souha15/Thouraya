import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecissiveReportComponent } from './decissive-report.component';

describe('DecissiveReportComponent', () => {
  let component: DecissiveReportComponent;
  let fixture: ComponentFixture<DecissiveReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecissiveReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecissiveReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
