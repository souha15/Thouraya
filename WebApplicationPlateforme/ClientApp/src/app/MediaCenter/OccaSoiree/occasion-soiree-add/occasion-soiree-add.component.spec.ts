import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OccasionSoireeAddComponent } from './occasion-soiree-add.component';

describe('OccasionSoireeAddComponent', () => {
  let component: OccasionSoireeAddComponent;
  let fixture: ComponentFixture<OccasionSoireeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OccasionSoireeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccasionSoireeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
