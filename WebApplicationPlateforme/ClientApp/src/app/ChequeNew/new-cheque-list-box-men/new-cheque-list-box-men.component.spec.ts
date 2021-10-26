import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChequeListBoxMenComponent } from './new-cheque-list-box-men.component';

describe('NewChequeListBoxMenComponent', () => {
  let component: NewChequeListBoxMenComponent;
  let fixture: ComponentFixture<NewChequeListBoxMenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewChequeListBoxMenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewChequeListBoxMenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
