import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeuniteComponent } from './typeunite.component';

describe('TypeuniteComponent', () => {
  let component: TypeuniteComponent;
  let fixture: ComponentFixture<TypeuniteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeuniteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeuniteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
