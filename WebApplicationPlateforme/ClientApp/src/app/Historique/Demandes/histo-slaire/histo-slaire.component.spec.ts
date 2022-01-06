import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoSlaireComponent } from './histo-slaire.component';

describe('HistoSlaireComponent', () => {
  let component: HistoSlaireComponent;
  let fixture: ComponentFixture<HistoSlaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoSlaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoSlaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
