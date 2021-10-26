import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChequeMenuEtabFinComponent } from './new-cheque-menu-etab-fin.component';

describe('NewChequeMenuEtabFinComponent', () => {
  let component: NewChequeMenuEtabFinComponent;
  let fixture: ComponentFixture<NewChequeMenuEtabFinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewChequeMenuEtabFinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewChequeMenuEtabFinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
