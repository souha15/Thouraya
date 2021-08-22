import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DotationOrphelinComponent } from './dotation-orphelin.component';

describe('DotationOrphelinComponent', () => {
  let component: DotationOrphelinComponent;
  let fixture: ComponentFixture<DotationOrphelinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DotationOrphelinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DotationOrphelinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
