import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChequeListEtabFinComponent } from './new-cheque-list-etab-fin.component';

describe('NewChequeListEtabFinComponent', () => {
  let component: NewChequeListEtabFinComponent;
  let fixture: ComponentFixture<NewChequeListEtabFinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewChequeListEtabFinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewChequeListEtabFinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
