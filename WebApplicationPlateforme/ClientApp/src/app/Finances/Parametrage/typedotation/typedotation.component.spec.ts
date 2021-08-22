import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypedotationComponent } from './typedotation.component';

describe('TypedotationComponent', () => {
  let component: TypedotationComponent;
  let fixture: ComponentFixture<TypedotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypedotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypedotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
