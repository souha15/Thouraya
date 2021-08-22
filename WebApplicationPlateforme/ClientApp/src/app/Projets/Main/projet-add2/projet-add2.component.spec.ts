import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetAdd2Component } from './projet-add2.component';

describe('ProjetAdd2Component', () => {
  let component: ProjetAdd2Component;
  let fixture: ComponentFixture<ProjetAdd2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjetAdd2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetAdd2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
