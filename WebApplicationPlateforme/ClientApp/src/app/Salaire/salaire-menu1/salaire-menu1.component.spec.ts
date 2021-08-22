import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaireMenu1Component } from './salaire-menu1.component';

describe('SalaireMenu1Component', () => {
  let component: SalaireMenu1Component;
  let fixture: ComponentFixture<SalaireMenu1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaireMenu1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaireMenu1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
