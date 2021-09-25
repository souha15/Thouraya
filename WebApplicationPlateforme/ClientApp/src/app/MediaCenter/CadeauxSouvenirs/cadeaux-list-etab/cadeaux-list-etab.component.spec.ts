import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadeauxListEtabComponent } from './cadeaux-list-etab.component';

describe('CadeauxListEtabComponent', () => {
  let component: CadeauxListEtabComponent;
  let fixture: ComponentFixture<CadeauxListEtabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadeauxListEtabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadeauxListEtabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
