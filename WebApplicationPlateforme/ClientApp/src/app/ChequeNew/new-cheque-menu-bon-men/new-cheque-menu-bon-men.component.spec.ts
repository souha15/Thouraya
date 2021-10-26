import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChequeMenuBonMenComponent } from './new-cheque-menu-bon-men.component';

describe('NewChequeMenuBonMenComponent', () => {
  let component: NewChequeMenuBonMenComponent;
  let fixture: ComponentFixture<NewChequeMenuBonMenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewChequeMenuBonMenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewChequeMenuBonMenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
