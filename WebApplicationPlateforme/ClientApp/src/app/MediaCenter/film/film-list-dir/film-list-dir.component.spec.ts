import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmListDirComponent } from './film-list-dir.component';

describe('FilmListDirComponent', () => {
  let component: FilmListDirComponent;
  let fixture: ComponentFixture<FilmListDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmListDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmListDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
