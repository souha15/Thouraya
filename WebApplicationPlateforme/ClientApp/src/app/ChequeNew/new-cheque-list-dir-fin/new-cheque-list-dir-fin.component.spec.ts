import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChequeListDirFinComponent } from './new-cheque-list-dir-fin.component';

describe('NewChequeListDirFinComponent', () => {
  let component: NewChequeListDirFinComponent;
  let fixture: ComponentFixture<NewChequeListDirFinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewChequeListDirFinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewChequeListDirFinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
