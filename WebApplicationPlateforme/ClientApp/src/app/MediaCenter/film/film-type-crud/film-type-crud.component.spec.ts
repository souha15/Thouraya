import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmTypeCrudComponent } from './film-type-crud.component';

describe('FilmTypeCrudComponent', () => {
  let component: FilmTypeCrudComponent;
  let fixture: ComponentFixture<FilmTypeCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmTypeCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmTypeCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
