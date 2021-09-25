import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartageMediaAddComponent } from './partage-media-add.component';

describe('PartageMediaAddComponent', () => {
  let component: PartageMediaAddComponent;
  let fixture: ComponentFixture<PartageMediaAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartageMediaAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartageMediaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
