import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MontageAddComponent } from './montage-add.component';

describe('MontageAddComponent', () => {
  let component: MontageAddComponent;
  let fixture: ComponentFixture<MontageAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MontageAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MontageAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
