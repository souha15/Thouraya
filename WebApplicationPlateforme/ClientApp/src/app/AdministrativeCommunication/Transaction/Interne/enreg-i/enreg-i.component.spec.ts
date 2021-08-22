import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnregIComponent } from './enreg-i.component';

describe('EnregIComponent', () => {
  let component: EnregIComponent;
  let fixture: ComponentFixture<EnregIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnregIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnregIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
