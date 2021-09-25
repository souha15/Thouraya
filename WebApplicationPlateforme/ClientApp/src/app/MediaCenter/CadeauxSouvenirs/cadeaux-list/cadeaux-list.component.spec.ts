import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadeauxListComponent } from './cadeaux-list.component';

describe('CadeauxListComponent', () => {
  let component: CadeauxListComponent;
  let fixture: ComponentFixture<CadeauxListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadeauxListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadeauxListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
