import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageAC2Component } from './main-page-ac2.component';

describe('MainPageAC2Component', () => {
  let component: MainPageAC2Component;
  let fixture: ComponentFixture<MainPageAC2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPageAC2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageAC2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
