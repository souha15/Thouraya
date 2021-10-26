import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChequeMenuDirComponent } from './new-cheque-menu-dir.component';

describe('NewChequeMenuDirComponent', () => {
  let component: NewChequeMenuDirComponent;
  let fixture: ComponentFixture<NewChequeMenuDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewChequeMenuDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewChequeMenuDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
