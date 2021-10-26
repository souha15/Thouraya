import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChequeMenuDirGComponent } from './new-cheque-menu-dir-g.component';

describe('NewChequeMenuDirGComponent', () => {
  let component: NewChequeMenuDirGComponent;
  let fixture: ComponentFixture<NewChequeMenuDirGComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewChequeMenuDirGComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewChequeMenuDirGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
