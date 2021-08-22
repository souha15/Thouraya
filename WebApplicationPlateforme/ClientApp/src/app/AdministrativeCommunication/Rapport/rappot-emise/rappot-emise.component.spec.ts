import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RappotEmiseComponent } from './rappot-emise.component';

describe('RappotEmiseComponent', () => {
  let component: RappotEmiseComponent;
  let fixture: ComponentFixture<RappotEmiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RappotEmiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RappotEmiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
