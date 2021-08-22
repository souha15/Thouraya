import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeUniteComponent } from './liste-unite.component';

describe('ListeUniteComponent', () => {
  let component: ListeUniteComponent;
  let fixture: ComponentFixture<ListeUniteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeUniteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeUniteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
