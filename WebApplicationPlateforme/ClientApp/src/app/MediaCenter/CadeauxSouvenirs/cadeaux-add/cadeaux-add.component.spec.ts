import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadeauxAddComponent } from './cadeaux-add.component';

describe('CadeauxAddComponent', () => {
  let component: CadeauxAddComponent;
  let fixture: ComponentFixture<CadeauxAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadeauxAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadeauxAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
