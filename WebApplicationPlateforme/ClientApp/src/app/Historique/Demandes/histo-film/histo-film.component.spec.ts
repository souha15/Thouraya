import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoFilmComponent } from './histo-film.component';

describe('HistoFilmComponent', () => {
  let component: HistoFilmComponent;
  let fixture: ComponentFixture<HistoFilmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoFilmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
