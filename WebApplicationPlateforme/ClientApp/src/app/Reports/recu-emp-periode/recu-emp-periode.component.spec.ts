import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuEmpPeriodeComponent } from './recu-emp-periode.component';

describe('RecuEmpPeriodeComponent', () => {
  let component: RecuEmpPeriodeComponent;
  let fixture: ComponentFixture<RecuEmpPeriodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecuEmpPeriodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuEmpPeriodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
