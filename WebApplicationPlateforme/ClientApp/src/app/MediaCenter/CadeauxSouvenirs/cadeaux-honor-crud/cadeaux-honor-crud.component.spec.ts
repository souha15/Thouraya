import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadeauxHonorCrudComponent } from './cadeaux-honor-crud.component';

describe('CadeauxHonorCrudComponent', () => {
  let component: CadeauxHonorCrudComponent;
  let fixture: ComponentFixture<CadeauxHonorCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadeauxHonorCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadeauxHonorCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
