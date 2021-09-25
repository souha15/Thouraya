import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadeauxOccasionCrudComponent } from './cadeaux-occasion-crud.component';

describe('CadeauxOccasionCrudComponent', () => {
  let component: CadeauxOccasionCrudComponent;
  let fixture: ComponentFixture<CadeauxOccasionCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadeauxOccasionCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadeauxOccasionCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
