import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoArtsComponent } from './histo-arts.component';

describe('HistoArtsComponent', () => {
  let component: HistoArtsComponent;
  let fixture: ComponentFixture<HistoArtsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoArtsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoArtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
