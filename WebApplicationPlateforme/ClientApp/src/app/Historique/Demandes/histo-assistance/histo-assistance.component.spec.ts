import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoAssistanceComponent } from './histo-assistance.component';

describe('HistoAssistanceComponent', () => {
  let component: HistoAssistanceComponent;
  let fixture: ComponentFixture<HistoAssistanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoAssistanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoAssistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
