import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnregTempRComponent } from './enreg-temp-r.component';

describe('EnregTempRComponent', () => {
  let component: EnregTempRComponent;
  let fixture: ComponentFixture<EnregTempRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnregTempRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnregTempRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
