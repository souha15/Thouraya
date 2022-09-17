import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseChequeForBoxMenComponent } from './close-cheque-for-box-men.component';

describe('CloseChequeForBoxMenComponent', () => {
  let component: CloseChequeForBoxMenComponent;
  let fixture: ComponentFixture<CloseChequeForBoxMenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseChequeForBoxMenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseChequeForBoxMenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
