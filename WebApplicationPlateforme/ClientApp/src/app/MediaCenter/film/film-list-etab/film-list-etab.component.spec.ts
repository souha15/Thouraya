import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmListEtabComponent } from './film-list-etab.component';

describe('FilmListEtabComponent', () => {
  let component: FilmListEtabComponent;
  let fixture: ComponentFixture<FilmListEtabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmListEtabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmListEtabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
