import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenusEmpDateComponent } from './revenus-emp-date.component';

describe('RevenusEmpDateComponent', () => {
  let component: RevenusEmpDateComponent;
  let fixture: ComponentFixture<RevenusEmpDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevenusEmpDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenusEmpDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
