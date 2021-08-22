import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnregDefEComponent } from './enreg-def-e.component';

describe('EnregDefEComponent', () => {
  let component: EnregDefEComponent;
  let fixture: ComponentFixture<EnregDefEComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnregDefEComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnregDefEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
