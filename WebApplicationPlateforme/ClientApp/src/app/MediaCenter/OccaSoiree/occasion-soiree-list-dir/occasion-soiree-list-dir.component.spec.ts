import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OccasionSoireeListDirComponent } from './occasion-soiree-list-dir.component';

describe('OccasionSoireeListDirComponent', () => {
  let component: OccasionSoireeListDirComponent;
  let fixture: ComponentFixture<OccasionSoireeListDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OccasionSoireeListDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccasionSoireeListDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
