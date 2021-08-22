import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatuniteComponent } from './etatunite.component';

describe('EtatuniteComponent', () => {
  let component: EtatuniteComponent;
  let fixture: ComponentFixture<EtatuniteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtatuniteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtatuniteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
