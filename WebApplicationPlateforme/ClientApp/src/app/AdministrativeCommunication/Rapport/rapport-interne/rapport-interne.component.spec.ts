import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportInterneComponent } from './rapport-interne.component';

describe('RapportInterneComponent', () => {
  let component: RapportInterneComponent;
  let fixture: ComponentFixture<RapportInterneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RapportInterneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RapportInterneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
