import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MontageListDirComponent } from './montage-list-dir.component';

describe('MontageListDirComponent', () => {
  let component: MontageListDirComponent;
  let fixture: ComponentFixture<MontageListDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MontageListDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MontageListDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
