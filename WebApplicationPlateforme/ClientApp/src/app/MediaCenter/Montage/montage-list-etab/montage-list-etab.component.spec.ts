import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MontageListEtabComponent } from './montage-list-etab.component';

describe('MontageListEtabComponent', () => {
  let component: MontageListEtabComponent;
  let fixture: ComponentFixture<MontageListEtabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MontageListEtabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MontageListEtabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
