import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OccasionSoireeTypeCrudComponent } from './occasion-soiree-type-crud.component';

describe('OccasionSoireeTypeCrudComponent', () => {
  let component: OccasionSoireeTypeCrudComponent;
  let fixture: ComponentFixture<OccasionSoireeTypeCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OccasionSoireeTypeCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccasionSoireeTypeCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
