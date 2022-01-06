import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoResidenceComponent } from './histo-residence.component';

describe('HistoResidenceComponent', () => {
  let component: HistoResidenceComponent;
  let fixture: ComponentFixture<HistoResidenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoResidenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoResidenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
