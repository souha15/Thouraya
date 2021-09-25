import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OccasionSoireeEditComponent } from './occasion-soiree-edit.component';

describe('OccasionSoireeEditComponent', () => {
  let component: OccasionSoireeEditComponent;
  let fixture: ComponentFixture<OccasionSoireeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OccasionSoireeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccasionSoireeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
