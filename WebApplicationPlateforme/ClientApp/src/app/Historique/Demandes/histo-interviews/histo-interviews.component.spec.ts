import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoInterviewsComponent } from './histo-interviews.component';

describe('HistoInterviewsComponent', () => {
  let component: HistoInterviewsComponent;
  let fixture: ComponentFixture<HistoInterviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoInterviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoInterviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
