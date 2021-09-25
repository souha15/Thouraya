import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadeauxListUserComponent } from './cadeaux-list-user.component';

describe('CadeauxListUserComponent', () => {
  let component: CadeauxListUserComponent;
  let fixture: ComponentFixture<CadeauxListUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadeauxListUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadeauxListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
