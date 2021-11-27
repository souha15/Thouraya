import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DotationDemMenuComponent } from './dotation-dem-menu.component';

describe('DotationDemMenuComponent', () => {
  let component: DotationDemMenuComponent;
  let fixture: ComponentFixture<DotationDemMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DotationDemMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DotationDemMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
