import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSoldeComponent } from './add-solde.component';

describe('AddSoldeComponent', () => {
  let component: AddSoldeComponent;
  let fixture: ComponentFixture<AddSoldeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSoldeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSoldeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
