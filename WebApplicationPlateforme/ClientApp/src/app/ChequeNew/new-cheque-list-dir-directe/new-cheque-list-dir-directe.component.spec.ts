import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChequeListDirDirecteComponent } from './new-cheque-list-dir-directe.component';

describe('NewChequeListDirDirecteComponent', () => {
  let component: NewChequeListDirDirecteComponent;
  let fixture: ComponentFixture<NewChequeListDirDirecteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewChequeListDirDirecteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewChequeListDirDirecteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
