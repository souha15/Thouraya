import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DotationDemUserShowMenuComponent } from './dotation-dem-user-show-menu.component';

describe('DotationDemUserShowMenuComponent', () => {
  let component: DotationDemUserShowMenuComponent;
  let fixture: ComponentFixture<DotationDemUserShowMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DotationDemUserShowMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DotationDemUserShowMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
