import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartageMediaDetailComponent } from './partage-media-detail.component';

describe('PartageMediaDetailComponent', () => {
  let component: PartageMediaDetailComponent;
  let fixture: ComponentFixture<PartageMediaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartageMediaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartageMediaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
