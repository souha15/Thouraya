import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepChequeAddComponent } from './recep-cheque-add.component';

describe('RecepChequeAddComponent', () => {
  let component: RecepChequeAddComponent;
  let fixture: ComponentFixture<RecepChequeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecepChequeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepChequeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
