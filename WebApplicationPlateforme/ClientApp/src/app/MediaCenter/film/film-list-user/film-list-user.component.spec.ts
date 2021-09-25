import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmListUserComponent } from './film-list-user.component';

describe('FilmListUserComponent', () => {
  let component: FilmListUserComponent;
  let fixture: ComponentFixture<FilmListUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmListUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
