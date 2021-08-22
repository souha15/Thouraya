import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BureauImmobPageComponent } from './bureau-immob-page.component';

describe('BureauImmobPageComponent', () => {
  let component: BureauImmobPageComponent;
  let fixture: ComponentFixture<BureauImmobPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BureauImmobPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BureauImmobPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
