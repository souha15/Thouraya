import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MontageEditComponent } from './montage-edit.component';

describe('MontageEditComponent', () => {
  let component: MontageEditComponent;
  let fixture: ComponentFixture<MontageEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MontageEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MontageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
