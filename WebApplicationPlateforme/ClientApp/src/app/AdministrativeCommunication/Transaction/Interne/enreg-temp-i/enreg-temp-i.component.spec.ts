import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnregTempIComponent } from './enreg-temp-i.component';

describe('EnregTempIComponent', () => {
  let component: EnregTempIComponent;
  let fixture: ComponentFixture<EnregTempIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnregTempIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnregTempIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
