import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnregEComponent } from './enreg-e.component';

describe('EnregEComponent', () => {
  let component: EnregEComponent;
  let fixture: ComponentFixture<EnregEComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnregEComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnregEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
