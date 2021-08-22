import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNotAcceptedComponent } from './main-not-accepted.component';

describe('MainNotAcceptedComponent', () => {
  let component: MainNotAcceptedComponent;
  let fixture: ComponentFixture<MainNotAcceptedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainNotAcceptedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNotAcceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
