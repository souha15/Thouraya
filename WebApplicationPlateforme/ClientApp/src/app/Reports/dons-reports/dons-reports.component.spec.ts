import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonsReportsComponent } from './dons-reports.component';

describe('DonsReportsComponent', () => {
  let component: DonsReportsComponent;
  let fixture: ComponentFixture<DonsReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonsReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
