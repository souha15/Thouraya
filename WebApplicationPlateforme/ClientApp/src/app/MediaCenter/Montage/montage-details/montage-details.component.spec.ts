import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MontageDetailsComponent } from './montage-details.component';

describe('MontageDetailsComponent', () => {
  let component: MontageDetailsComponent;
  let fixture: ComponentFixture<MontageDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MontageDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MontageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
