import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RabattreReportComponent } from './rabattre-report.component';

describe('RabattreReportComponent', () => {
  let component: RabattreReportComponent;
  let fixture: ComponentFixture<RabattreReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RabattreReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RabattreReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
