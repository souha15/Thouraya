import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OccasionSoireeListEtabComponent } from './occasion-soiree-list-etab.component';

describe('OccasionSoireeListEtabComponent', () => {
  let component: OccasionSoireeListEtabComponent;
  let fixture: ComponentFixture<OccasionSoireeListEtabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OccasionSoireeListEtabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccasionSoireeListEtabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
