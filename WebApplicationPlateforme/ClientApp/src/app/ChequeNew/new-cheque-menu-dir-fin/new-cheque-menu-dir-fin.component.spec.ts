import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChequeMenuDirFinComponent } from './new-cheque-menu-dir-fin.component';

describe('NewChequeMenuDirFinComponent', () => {
  let component: NewChequeMenuDirFinComponent;
  let fixture: ComponentFixture<NewChequeMenuDirFinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewChequeMenuDirFinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewChequeMenuDirFinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
