import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmEdityComponent } from './film-edity.component';

describe('FilmEdityComponent', () => {
  let component: FilmEdityComponent;
  let fixture: ComponentFixture<FilmEdityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmEdityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmEdityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
