import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DotationEditComponent } from './dotation-edit.component';

describe('DotationEditComponent', () => {
  let component: DotationEditComponent;
  let fixture: ComponentFixture<DotationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DotationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DotationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
