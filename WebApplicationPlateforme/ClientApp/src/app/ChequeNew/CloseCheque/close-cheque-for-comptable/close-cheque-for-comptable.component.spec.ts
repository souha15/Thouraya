import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseChequeForComptableComponent } from './close-cheque-for-comptable.component';

describe('CloseChequeForComptableComponent', () => {
  let component: CloseChequeForComptableComponent;
  let fixture: ComponentFixture<CloseChequeForComptableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseChequeForComptableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseChequeForComptableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
