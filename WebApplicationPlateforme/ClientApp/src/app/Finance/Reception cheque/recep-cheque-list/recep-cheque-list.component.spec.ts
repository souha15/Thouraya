import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepChequeListComponent } from './recep-cheque-list.component';

describe('RecepChequeListComponent', () => {
  let component: RecepChequeListComponent;
  let fixture: ComponentFixture<RecepChequeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecepChequeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepChequeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
