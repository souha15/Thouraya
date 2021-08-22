import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnregDefIComponent } from './enreg-def-i.component';

describe('EnregDefIComponent', () => {
  let component: EnregDefIComponent;
  let fixture: ComponentFixture<EnregDefIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnregDefIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnregDefIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
