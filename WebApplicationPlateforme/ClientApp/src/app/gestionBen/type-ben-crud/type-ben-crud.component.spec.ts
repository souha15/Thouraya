import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeBenCrudComponent } from './type-ben-crud.component';

describe('TypeBenCrudComponent', () => {
  let component: TypeBenCrudComponent;
  let fixture: ComponentFixture<TypeBenCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeBenCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeBenCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
