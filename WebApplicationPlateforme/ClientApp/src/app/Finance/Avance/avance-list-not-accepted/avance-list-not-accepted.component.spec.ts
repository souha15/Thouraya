import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvanceListNotAcceptedComponent } from './avance-list-not-accepted.component';

describe('AvanceListNotAcceptedComponent', () => {
  let component: AvanceListNotAcceptedComponent;
  let fixture: ComponentFixture<AvanceListNotAcceptedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvanceListNotAcceptedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvanceListNotAcceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
