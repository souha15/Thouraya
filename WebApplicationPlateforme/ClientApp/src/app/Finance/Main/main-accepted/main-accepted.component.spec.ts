import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAcceptedComponent } from './main-accepted.component';

describe('MainAcceptedComponent', () => {
  let component: MainAcceptedComponent;
  let fixture: ComponentFixture<MainAcceptedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainAcceptedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainAcceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
