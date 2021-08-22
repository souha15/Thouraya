import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPointageEmpComponent } from './details-pointage-emp.component';

describe('DetailsPointageEmpComponent', () => {
  let component: DetailsPointageEmpComponent;
  let fixture: ComponentFixture<DetailsPointageEmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsPointageEmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPointageEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
