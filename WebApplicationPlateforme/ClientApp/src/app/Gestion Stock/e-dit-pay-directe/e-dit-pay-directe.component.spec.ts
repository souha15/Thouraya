import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EDitPayDirecteComponent } from './e-dit-pay-directe.component';

describe('EDitPayDirecteComponent', () => {
  let component: EDitPayDirecteComponent;
  let fixture: ComponentFixture<EDitPayDirecteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EDitPayDirecteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EDitPayDirecteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
