import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandsRHComponent } from './demands-rh.component';

describe('DemandsRHComponent', () => {
  let component: DemandsRHComponent;
  let fixture: ComponentFixture<DemandsRHComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandsRHComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandsRHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
