import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemCongeMaterniteComponent } from './dem-conge-maternite.component';

describe('DemCongeMaterniteComponent', () => {
  let component: DemCongeMaterniteComponent;
  let fixture: ComponentFixture<DemCongeMaterniteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemCongeMaterniteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemCongeMaterniteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
