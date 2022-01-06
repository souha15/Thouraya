import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoAvanceComponent } from './histo-avance.component';

describe('HistoAvanceComponent', () => {
  let component: HistoAvanceComponent;
  let fixture: ComponentFixture<HistoAvanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoAvanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoAvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
