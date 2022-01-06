import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoEquiComponent } from './histo-equi.component';

describe('HistoEquiComponent', () => {
  let component: HistoEquiComponent;
  let fixture: ComponentFixture<HistoEquiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoEquiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoEquiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
