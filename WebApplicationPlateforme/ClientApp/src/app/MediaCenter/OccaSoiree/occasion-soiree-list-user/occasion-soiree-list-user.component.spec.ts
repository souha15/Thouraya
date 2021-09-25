import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OccasionSoireeListUserComponent } from './occasion-soiree-list-user.component';

describe('OccasionSoireeListUserComponent', () => {
  let component: OccasionSoireeListUserComponent;
  let fixture: ComponentFixture<OccasionSoireeListUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OccasionSoireeListUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccasionSoireeListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
