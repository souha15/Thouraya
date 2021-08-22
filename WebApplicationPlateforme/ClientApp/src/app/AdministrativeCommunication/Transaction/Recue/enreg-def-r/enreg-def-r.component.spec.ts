import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnregDefRComponent } from './enreg-def-r.component';

describe('EnregDefRComponent', () => {
  let component: EnregDefRComponent;
  let fixture: ComponentFixture<EnregDefRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnregDefRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnregDefRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
