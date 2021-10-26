import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChequeListDirGeneralComponent } from './new-cheque-list-dir-general.component';

describe('NewChequeListDirGeneralComponent', () => {
  let component: NewChequeListDirGeneralComponent;
  let fixture: ComponentFixture<NewChequeListDirGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewChequeListDirGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewChequeListDirGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
