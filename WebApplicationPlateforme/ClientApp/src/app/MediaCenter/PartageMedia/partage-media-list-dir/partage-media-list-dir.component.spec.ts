import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartageMediaListDirComponent } from './partage-media-list-dir.component';

describe('PartageMediaListDirComponent', () => {
  let component: PartageMediaListDirComponent;
  let fixture: ComponentFixture<PartageMediaListDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartageMediaListDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartageMediaListDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
