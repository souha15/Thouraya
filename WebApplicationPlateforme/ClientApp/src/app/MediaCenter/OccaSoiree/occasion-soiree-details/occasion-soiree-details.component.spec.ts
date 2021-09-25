import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OccasionSoireeDetailsComponent } from './occasion-soiree-details.component';

describe('OccasionSoireeDetailsComponent', () => {
  let component: OccasionSoireeDetailsComponent;
  let fixture: ComponentFixture<OccasionSoireeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OccasionSoireeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccasionSoireeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
