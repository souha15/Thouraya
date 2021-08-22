import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DotationDetailsComponent } from './dotation-details.component';

describe('DotationDetailsComponent', () => {
  let component: DotationDetailsComponent;
  let fixture: ComponentFixture<DotationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DotationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DotationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
