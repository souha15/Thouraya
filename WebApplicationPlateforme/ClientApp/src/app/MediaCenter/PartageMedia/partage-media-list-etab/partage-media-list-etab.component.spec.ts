import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartageMediaListEtabComponent } from './partage-media-list-etab.component';

describe('PartageMediaListEtabComponent', () => {
  let component: PartageMediaListEtabComponent;
  let fixture: ComponentFixture<PartageMediaListEtabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartageMediaListEtabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartageMediaListEtabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
