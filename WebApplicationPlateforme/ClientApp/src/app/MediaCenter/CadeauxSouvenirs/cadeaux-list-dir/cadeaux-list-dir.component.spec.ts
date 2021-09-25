import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadeauxListDirComponent } from './cadeaux-list-dir.component';

describe('CadeauxListDirComponent', () => {
  let component: CadeauxListDirComponent;
  let fixture: ComponentFixture<CadeauxListDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadeauxListDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadeauxListDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
