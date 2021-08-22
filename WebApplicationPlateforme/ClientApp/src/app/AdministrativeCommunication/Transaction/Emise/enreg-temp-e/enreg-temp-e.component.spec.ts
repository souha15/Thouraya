import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnregTempEComponent } from './enreg-temp-e.component';

describe('EnregTempEComponent', () => {
  let component: EnregTempEComponent;
  let fixture: ComponentFixture<EnregTempEComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnregTempEComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnregTempEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
