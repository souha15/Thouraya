import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaireMenu2Component } from './salaire-menu2.component';

describe('SalaireMenu2Component', () => {
  let component: SalaireMenu2Component;
  let fixture: ComponentFixture<SalaireMenu2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaireMenu2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaireMenu2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
